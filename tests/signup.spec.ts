import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@smoke', () => {
const testData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'RegisterUsers');

for (const data of testData) {

    test(`User Signup Test`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const homePage = new HomePage(page);

        await page.goto('https://automationexercise.com/');
        await loginPage.navigateToLoginPage();
        await signupPage.enterSignupDetails(
            data['Name'],
            data['Email'].toString()
        );

        await signupPage.fillAccountInformation(
            data['Password'].toString(),
            data['Day'].toString(),
            data['Month'].toString(),
            data['Year'].toString()
        );

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

        await signupPage.clickCreateAccountButton();
        await signupPage.clickContinueButton();
        await homePage.clickDeleteAccount();
        await homePage.getAccountDeletionMessage();
    });
}
});