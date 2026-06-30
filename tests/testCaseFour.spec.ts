//Test Case 4: Logout User
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
//5. Verify 'Login to your account' is visible
//6. Enter correct email address and password
//7. Click 'login' button
//8. Verify login success
//9. Click 'Logout' button
//10. Verify that user is navigated to login page


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@sanity', () => {

const testData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'UserLogout');

for (const data of testData) {

    test(`TC 4 - User Logout Test`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const homePage = new HomePage(page);

        await page.goto('https://automationexercise.com/');
        await loginPage.navigateToLoginPage();
        await loginPage.login(
            data['Email'].toString(),
            data['Password'].toString()
        );
        await expect(loginPage.logoutLink).toBeVisible();
        await Promise.all([
           // page.waitForURL('/login'),
            loginPage.logoutLink.click()
        ]);
    });
}
});