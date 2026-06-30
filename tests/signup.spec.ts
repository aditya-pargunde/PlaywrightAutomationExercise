import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@smoke', () => {
    const testData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'RegisterUsers');

    for (const data of testData) {

        test('User Signup Test', async ({ page }) => {

            const loginPage = new LoginPage(page);
            const signupPage = new SignupPage(page);
            const homePage = new HomePage(page);

            await test.step('Launch Automation Exercise application', async () => {
                await page.goto('https://automationexercise.com/');
            });

            await test.step('Navigate to Login / Signup page', async () => {
                await loginPage.navigateToLoginPage();
            });

            await test.step('Enter signup name and email', async () => {
                await signupPage.enterSignupDetails(
                    data['Name'],
                    data['Email'].toString()
                );
            });

            await test.step('Fill account information', async () => {
                await signupPage.fillAccountInformation(
                    data['Password'].toString(),
                    data['Day'].toString(),
                    data['Month'].toString(),
                    data['Year'].toString()
                );
            });

            await test.step('Fill address information', async () => {
                await signupPage.fillAddressInformation(
                    data['First Name'],
                    data['Last Name'],
                    data['Address'],
                    data['Country'],
                    data['State'],
                    data['City'],
                    data['Zipcode'].toString(),
                    data['Mobile number'].toString()
                );
            });

            await test.step('Create the account', async () => {
                await signupPage.clickCreateAccountButton();
            });

            await test.step('Continue after successful account creation', async () => {
                await signupPage.clickContinueButton();
            });

            await test.step('Delete the created account', async () => {
                await homePage.clickDeleteAccount();
            });

            await test.step('Verify account deletion message', async () => {
                await homePage.getAccountDeletionMessage();
            });

        });
    }
});