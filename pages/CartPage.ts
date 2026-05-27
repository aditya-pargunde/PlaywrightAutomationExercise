import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPageLocators } from '../Locators/CartPageLocators';

export class CartPage extends BasePage {

    readonly checkoutButton: Locator;
    readonly cartLink: Locator;
    readonly loginModal: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.locator(CartPageLocators.checkoutButton);
        this.cartLink = page.locator(CartPageLocators.cartLink);
        this.loginModal = page.locator(CartPageLocators.loginModal);
    }

    async goToCartPage() {
        await Promise.all([
            //    this.page.waitForURL('**/view_cart'),
            this.cartLink.click()
        ]);
    }

    async verifyProductsInCart(expectedProduct: string) {
        const cartItems = this.page.locator(CartPageLocators.cartItems);
        const count = await cartItems.count();
        if (count === 0) {
            throw new Error('No products found in the cart.');
        }
        const emptyCartMessage = this.page.getByText('Cart is empty! Click here to buy products.');
        if (await emptyCartMessage.isVisible()) {
            await this.page.getByRole('link', { name: 'here' }).click();
        }
        let productFound = false;
        for (let i = 0; i < count; i++) {
            const productName = await cartItems.nth(i).locator('h4 a').textContent();
            if (productName?.trim().includes(expectedProduct)) {
                productFound = true;
                console.log(`Cart item: ${productName}`);
                break;
            }
        }
        if (!productFound) {
            throw new Error(`Expected product "${expectedProduct}" not found in the cart.`);
        }
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async verifyLoginOnCheckout() {
        await expect(this.loginModal).toBeVisible();
        await this.page.getByRole('link', { name: 'Register / Login' }).click();
    }
}