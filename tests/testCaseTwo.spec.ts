//Test Case 2: Login User with correct email and password
//1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
//5. Verify 'Login to your account' is visible
//6. Enter correct email address and password
//7. Click 'login' button
//8. Verify that 'Logged in as username' is visible


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@regression', () => {

    const testData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'UserLogout');

    for (const data of testData) {

        test(`TC 2 - User Login Test`, async ({ page }) => {

            const loginPage = new LoginPage(page);

            await test.step('Launch Automation Exercise application', async () => {
                await page.goto('https://automationexercise.com/');
            });

            await test.step('Navigate to Login page', async () => {
                await loginPage.navigateToLoginPage();
            });

            await test.step('Login with valid credentials', async () => {
                await loginPage.login(
                    data['Email'].toString(),
                    data['Password'].toString()
                );
            });

            await test.step('Verify user is logged in successfully', async () => {
                await expect(loginPage.logoutLink).toBeVisible();
            });

            await test.step('Logout from the application', async () => {
                await Promise.all([
                    page.waitForURL('**/login'),
                    loginPage.logoutLink.click()
                ]);
            });

            await test.step('Verify user is redirected to Login page', async () => {
                await expect(page).toHaveURL(/.*login/);
            });

        });
    }
});