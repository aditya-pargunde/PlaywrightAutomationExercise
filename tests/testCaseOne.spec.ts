//Test Case 1: Register User
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
//5. Verify 'New User Signup!' is visible
//6. Enter name and email address
//7. Click 'Signup' button
//8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
//9. Fill details: Title, Name, Email, Password, Date of birth
//10. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
//11. Click 'Create Account button'
//12. Verify that 'ACCOUNT CREATED!' is visible
//13. Click 'Continue' button
//14. Click 'Delete Account' button
//15. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { ExcelUtils } from '../utils/ExcelUtils';

const testData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'RegisterUsers');

for (const data of testData) {

   test(`TC 1 - User Signup Test`, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);

    await test.step('Launch Automation Exercise application', async () => {
        await page.goto('https://automationexercise.com/');
    });

    await test.step('Navigate to Login / Signup page', async () => {
        await loginPage.navigateToLoginPage();
    });

    await test.step('Enter signup details', async () => {
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

    await test.step('Create account', async () => {
        await signupPage.clickCreateAccountButton();
    });

    await test.step('Continue after account creation', async () => {
        await signupPage.clickContinueButton();
    });

    await test.step('Delete account', async () => {
        await homePage.clickDeleteAccount();
    });

    await test.step('Verify account deletion', async () => {
        await homePage.getAccountDeletionMessage();
    });

});
}