import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPageLocators } from '../Locators/LoginPageLocators';

export class LoginPage extends BasePage {

    readonly signupLoginLink: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        super(page);
        this.signupLoginLink = page.locator(LoginPageLocators.signupLoginLink);
        this.loginEmailInput = page.locator(LoginPageLocators.loginEmailInput);
        this.loginPasswordInput = page.locator(LoginPageLocators.loginPasswordInput);
        this.loginButton = page.locator(LoginPageLocators.loginButton);
    }

    async navigateToLoginPage() {
        await this.signupLoginLink.click();
    }

    async login(email: string, password: string) {
        await this.fillInput(this.loginEmailInput,email);
        await this.fillInput(this.loginPasswordInput,password);
        await this.clickElement(this.loginButton);

    }

    getLoginErrorMessage() {
        return this.page.locator(LoginPageLocators.loginErrorMessage);

    }
}