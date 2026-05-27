import { Locator, Page, expect } from '@playwright/test';

import { ContactUsPageLocators } from '../locators/ContactUsPageLocators';

export class ContactUsPage {

    readonly page: Page;

    readonly contactUsHeader: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.contactUsHeader = page.locator(ContactUsPageLocators.contactUsHeader);
        this.nameInput = page.locator(ContactUsPageLocators.nameInput);
        this.emailInput = page.locator(ContactUsPageLocators.emailInput);
        this.subjectInput = page.locator(ContactUsPageLocators.subjectInput);
        this.messageInput = page.locator(ContactUsPageLocators.messageInput);
        this.submitButton = page.locator(ContactUsPageLocators.submitButton);
    }

    async enterFormDetails(
        name: string,
        email: string,
        subject: string,
        message: string
    ) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    async verifyFileUpload(
        filePath: string,
        duration: number = 2000
    ) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.locator(ContactUsPageLocators.fileUploadInput).click()

        ]);
        await fileChooser.setFiles(filePath);
        await this.page.waitForTimeout(duration);
    }

    async submitForm() {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Press OK to proceed!');
            await dialog.accept();
        });
        await this.submitButton.click();
    }

    async verifySuccessMessage() {
        const successMessage = this.page.locator(ContactUsPageLocators.successMessage);
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText('Success! Your details have been submitted successfully.');
    }
}