//Test Case 3: Login User with incorrect email and password
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
//5. Verify 'Login to your account' is visible
//6. Enter incorrect email address and password
//7. Click 'login' button
//8. Verify error 'Your email or password is incorrect!' is visible


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@regression', () => {

const testData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'InvalidLoginUsers');

for (const data of testData) {

    test(`TC 3 - User Login with Invalid Credentials Test`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const homePage = new HomePage(page);

        await page.goto('https://automationexercise.com/');
        await loginPage.navigateToLoginPage();
        await loginPage.login(
            data['Email'].toString(),
            data['Password'].toString()
        );
     await expect(loginPage.getLoginErrorMessage()).toBeVisible();
    });
}
});