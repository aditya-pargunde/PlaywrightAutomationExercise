import { Page, Locator, expect } from '@playwright/test';

import { BasePage } from './BasePage';

import { OrderConfirmationPageLocators } from '../Locators/OrderConfirmationPageLocators';

export class OrderConfirmationPage extends BasePage {

    readonly orderPlacedText: Locator;
    readonly orderConfirmationMessage: Locator;
    readonly downloadInvoiceLink: Locator;
    readonly continueShoppingLink: Locator;

    constructor(page: Page) {

        super(page);
        this.orderPlacedText = page.locator(OrderConfirmationPageLocators.orderPlacedText);
        this.orderConfirmationMessage = page.locator(OrderConfirmationPageLocators.orderConfirmationMessage);
        this.downloadInvoiceLink = page.locator(OrderConfirmationPageLocators.downloadInvoiceLink);
        this.continueShoppingLink = page.locator(OrderConfirmationPageLocators.continueShoppingLink);
    }

    async verifyOrderConfirmation() {
        await expect(this.orderPlacedText).toBeVisible();
        await expect(this.orderConfirmationMessage).toBeVisible();

    }

    async verifyDownloadInvoiceLink() {
        await expect(this.downloadInvoiceLink).toBeVisible();
        await this.downloadInvoiceLink.click();
    }

    async verifyContinueShopping() {
        await expect(this.continueShoppingLink).toBeVisible();
        await this.continueShoppingLink.click();

    }
}