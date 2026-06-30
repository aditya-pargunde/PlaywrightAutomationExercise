// Test Case 12: Add Products in Cart
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click 'Products' button
// 5. Hover over first product and click 'Add to cart'
// 6. Click 'Continue Shopping' button
// 7. Hover over second product and click 'Add to cart'
// 8. Click 'View Cart' button
// 9. Verify both products are added to Cart
// 10. Verify their prices, quantity and total price


import { test } from '../fixtures/adHandler.fixture';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';


test.describe('@regression', () => {

    test('TC 12 - Should add products to cart and verify details', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        let firstProduct: string;
        let secondProduct: string;

        await test.step('Launch Automation Exercise application', async () => {
            await page.goto('https://automationexercise.com/');
        });

        await test.step('Navigate to Products page', async () => {
            await productsPage.goToProductsPage();
        });

        await test.step('Retrieve available product names', async () => {
            const productTitles = await productsPage.getAllProductTitles();

            firstProduct = productTitles[0];
            secondProduct = productTitles[1];

            console.log('First Product:', firstProduct);
            console.log('Second Product:', secondProduct);
        });

        await test.step('Add first product to cart', async () => {
            await productsPage.hoverAndAddProductToCart(firstProduct);
            await productsPage.verifyCartAdditionAndContinueShopping();
        });

        await test.step('Add second product to cart', async () => {
            await productsPage.hoverAndAddProductToCart(secondProduct);
            await productsPage.verifyCartAdditionAndGoToCart();
        });

        await test.step('Verify both products are displayed in the cart', async () => {
            await cartPage.verifyProductsInCart(firstProduct);
            await cartPage.verifyProductsInCart(secondProduct);
        });

    });
});