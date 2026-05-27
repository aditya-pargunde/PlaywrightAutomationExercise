// SignupPage.ts

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { SignupPageLocators } from '../Locators/SignUpPageLocators';

export class SignupPage extends BasePage {

    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;

    readonly genderMrRadioButton: Locator;
    readonly passwordInput: Locator;

    readonly dayDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;

    readonly createAccountButton: Locator;
    readonly accountCreatedHeader: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {

        super(page);

        // Signup
        this.signupNameInput = page.locator(SignupPageLocators.signupNameInput);
        this.signupEmailInput = page.locator(SignupPageLocators.signupEmailInput);
        this.signupButton = page.locator(SignupPageLocators.signupButton);

        // Account Information
        this.genderMrRadioButton = page.locator(SignupPageLocators.genderMrRadioButton);
        this.passwordInput = page.locator(SignupPageLocators.passwordInput);

        this.dayDropdown = page.locator(SignupPageLocators.dayDropdown);
        this.monthDropdown = page.locator(SignupPageLocators.monthDropdown);
        this.yearDropdown = page.locator(SignupPageLocators.yearDropdown);

        // Address Information
        this.firstNameInput = page.locator(SignupPageLocators.firstNameInput);
        this.lastNameInput = page.locator(SignupPageLocators.lastNameInput);
        this.addressInput = page.locator(SignupPageLocators.addressInput);

        this.countryDropdown = page.locator(SignupPageLocators.countryDropdown);

        this.stateInput = page.locator(SignupPageLocators.stateInput);
        this.cityInput = page.locator(SignupPageLocators.cityInput);
        this.zipcodeInput = page.locator(SignupPageLocators.zipcodeInput);
        this.mobileNumberInput = page.locator(SignupPageLocators.mobileNumberInput);

        // Account Creation
        this.createAccountButton = page.locator(SignupPageLocators.createAccountButton);
        this.accountCreatedHeader = page.locator(SignupPageLocators.accountCreatedHeader);
        this.continueButton = page.locator(SignupPageLocators.continueButton);
    }

    async enterSignupDetails(name: string, email: string) {
        await this.fillInput(this.signupNameInput, name);
        await this.fillInput(this.signupEmailInput, email);
        await this.signupButton.click();
    }

    async fillAccountInformation(
        password: string,
        day: string,
        month: string,
        year: string
    ) {
        await this.genderMrRadioButton.check();
        await this.fillInput(this.passwordInput, password);
        await this.dayDropdown.selectOption(day);
        await this.monthDropdown.selectOption(month);
        await this.yearDropdown.selectOption(year);
    }

    async fillAddressInformation(
        firstName: string,
        lastName: string,
        address: string,
        country: string,
        state: string,
        city: string,
        zipcode: string,
        mobileNumber: string
    ) {
        await this.fillInput(this.firstNameInput, firstName);
        await this.fillInput(this.lastNameInput, lastName);
        await this.fillInput(this.addressInput, address);
        await this.countryDropdown.selectOption(country);
        await this.fillInput(this.stateInput, state);
        await this.fillInput(this.cityInput, city);
        await this.fillInput(this.zipcodeInput, zipcode);
        await this.fillInput(this.mobileNumberInput, mobileNumber);
    }

    async clickCreateAccountButton() {
        await this.createAccountButton.click();
        await this.isAccountCreatedVisible();
    }

    async isAccountCreatedVisible() {
        return await this.accountCreatedHeader.isVisible();
    }

    async clickContinueButton() {
        await Promise.all([
            // this.page.waitForURL('/'),
            this.continueButton.click()
        ]);
    }
}