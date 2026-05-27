import { Page, Locator, expect } from '@playwright/test';
import { CheckoutPageLocators } from '../Locators/CheckoutPageLocators';

export class CheckoutPage {

    readonly page: Page;

    readonly deliveryAddress: Locator;
    readonly billingAddress: Locator;

    constructor(page: Page) {

        this.page = page;
        this.deliveryAddress = page.locator(CheckoutPageLocators.deliveryAddress);
        this.billingAddress = page.locator(CheckoutPageLocators.billingAddress);
    }

    async compareAddresses() {

        const deliveryFirstName = await this.deliveryAddress.locator(CheckoutPageLocators.addressFirstName).textContent();
        const deliveryLastName = await this.deliveryAddress.locator(CheckoutPageLocators.addressLastName).textContent();
        const deliveryCity = await this.deliveryAddress.locator(CheckoutPageLocators.addressCity).textContent();
        const deliveryState = await this.deliveryAddress.locator(CheckoutPageLocators.addressState).textContent();
        const deliveryPostcode = await this.deliveryAddress.locator(CheckoutPageLocators.addressPostcode).textContent();
        const deliveryCountry = await this.deliveryAddress.locator(CheckoutPageLocators.addressCountry).textContent();
        const deliveryPhone = await this.deliveryAddress.locator(CheckoutPageLocators.addressPhone).textContent();

        
        const billingFirstName = await this.billingAddress.locator(CheckoutPageLocators.addressFirstName).textContent();
        const billingLastName = await this.billingAddress.locator(CheckoutPageLocators.addressLastName).textContent();
        const billingCity = await this.billingAddress.locator(CheckoutPageLocators.addressCity).textContent();
        const billingState = await this.billingAddress.locator(CheckoutPageLocators.addressState).textContent();

        const billingPostcode = await this.billingAddress.locator(CheckoutPageLocators.addressPostcode).textContent();
        const billingCountry = await this.billingAddress.locator(CheckoutPageLocators.addressCountry).textContent();
        const billingPhone = await this.billingAddress.locator(CheckoutPageLocators.addressPhone).textContent();

        expect(deliveryFirstName?.trim()).toBe(billingFirstName?.trim());
        expect(deliveryLastName?.trim()).toBe(billingLastName?.trim());
        expect(deliveryCity?.trim()).toBe(billingCity?.trim());
        expect(deliveryState?.trim()).toBe(billingState?.trim());
        expect(deliveryPostcode?.trim()).toBe(billingPostcode?.trim());
        expect(deliveryCountry?.trim()).toBe(billingCountry?.trim());
        expect(deliveryPhone?.trim()).toBe(billingPhone?.trim());

    }

    async reviewOrder() {
        const orderItems = this.page.locator(CheckoutPageLocators.orderItems);
        const count = await orderItems.count();
        if (count === 0) {
            throw new Error(
                'No products found in the order review.'
            );

        }

        for (let i = 0; i < count; i++) {
            const productName = await orderItems.nth(i).locator(CheckoutPageLocators.productName).textContent();
            console.log(`Order item: ${productName}`);

        }
    }

    async verifyPlaceOrder() {
        await this.page
            .locator(CheckoutPageLocators.placeOrderButton)
            .click();

    }
}