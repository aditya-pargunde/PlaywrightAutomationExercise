import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePageLocators } from "../Locators/HomePageLocators";

export class HomePage extends BasePage {

    readonly productsLink: Locator;
    readonly deleteAccountLink: Locator;
    readonly accountDeletedHeader: Locator;
    readonly accountDeletionConfirmationMessage: Locator;
    readonly logoutLink: Locator;
    readonly cartLink: Locator;
    
    constructor(page: Page) {

        super(page);
        this.productsLink = page.locator(HomePageLocators.productsLink);
        this.deleteAccountLink = page.locator(HomePageLocators.deleteAccountLink );
        this.accountDeletedHeader = page.locator(HomePageLocators.accountDeletedHeader);
        this.accountDeletionConfirmationMessage = page.locator(HomePageLocators.accountDeletionConfirmationMessage);
        this.logoutLink = page.locator(HomePageLocators.logoutLink);
        this.cartLink = page.locator(HomePageLocators.cartLink);
    }

    async navigateToProductsPage() {
        await this.productsLink.click();
    }

    async navigateToCartPage() {
        await this.cartLink.click();
    }

    async clickDeleteAccount() {
        await this.deleteAccountLink.click();
        await this.accountDeletedHeader.isVisible();
    }

    async isAccountDeletedVisible() {
        return await this.accountDeletedHeader.isVisible();
    }

    async getAccountDeletionMessage() {
        return await this.accountDeletionConfirmationMessage.textContent()
    }
}