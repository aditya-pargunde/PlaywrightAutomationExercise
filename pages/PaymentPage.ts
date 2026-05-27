import { Page, Locator, expect } from '@playwright/test';

import { BasePage } from './BasePage';

import { PaymentPageLocators } from '../Locators/PaymentPageLocators';

export class PaymentPage extends BasePage {

    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly payAndConfirmOrderButton: Locator;
    readonly orderPlacedHeader: Locator;
    readonly orderSuccessMessage: Locator;

    constructor(page: Page) {

        super(page);
        this.nameOnCardInput = page.locator(PaymentPageLocators.nameOnCardInput);
        this.cardNumberInput = page.locator(PaymentPageLocators.cardNumberInput);
        this.cvcInput = page.locator(PaymentPageLocators.cvcInput);
        this.expiryMonthInput = page.locator(PaymentPageLocators.expiryMonthInput);
        this.expiryYearInput = page.locator(PaymentPageLocators.expiryYearInput);
        this.payAndConfirmOrderButton = page.locator(PaymentPageLocators.payAndConfirmOrderButton);
        this.orderPlacedHeader = page.locator(PaymentPageLocators.orderPlacedHeader);
        this.orderSuccessMessage = page.locator(PaymentPageLocators.orderSuccessMessage);

    }

    async fillPaymentDetails(
        nameOnCard: string,
        cardNumber: string,
        cvc: string,
        expiryMonth: string,
        expiryYear: string
    ) {
        await this.fillInput(this.nameOnCardInput,nameOnCard);
        await this.fillInput(this.cardNumberInput,cardNumber);
        await this.fillInput(this.cvcInput,cvc);
        await this.fillInput(this.expiryMonthInput,expiryMonth);
        await this.fillInput(this.expiryYearInput,expiryYear);
    }

    async clickPayAndConfirmOrderButton() {
        await this.payAndConfirmOrderButton.click();
    }

    async verifyOrderPlaced() {
        await expect(this.orderPlacedHeader).toHaveText('Order Placed!');
        await expect(this.orderSuccessMessage).toBeVisible();
    }
}