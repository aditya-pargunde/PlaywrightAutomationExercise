import { Page, Locator } from '@playwright/test';
import { BasePageLocators } from '../Locators/BasePageLocators';

export class BasePage {

    readonly page: Page;

    readonly homeLink: Locator;
    readonly logoutLink: Locator;
    readonly contactUsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.locator(BasePageLocators.homeLink);
        this.logoutLink = page.locator(BasePageLocators.logoutLink);
        this.contactUsLink = page.locator(BasePageLocators.contactUsLink);
    }

    async navigateToHomePage() {
        await Promise.all([
            //  this.page.waitForURL('**/'),
            this.homeLink.click()
        ]);
    }

    async logout() {
        await Promise.all([
            //   this.page.waitForURL('**/login'),
            this.logoutLink.click()
        ]);
    }

    async clickElement(locator: Locator) {
        await locator.click();
    }

    async fillInput(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async waitForElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
    }

    async getElementText(locator: Locator) {
        return await locator.textContent();
    }
}