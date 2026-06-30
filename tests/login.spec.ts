import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@smoke', () => {

    const userData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'UserLogout');

    test('User Login Test', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await test.step('Launch Automation Exercise application', async () => {
            await page.goto('https://automationexercise.com/');
        });

        await test.step('Navigate to Login page', async () => {
            await loginPage.navigateToLoginPage();
        });

        await test.step('Enter valid email and password', async () => {
            await loginPage.login(
                userData[0]['Email'].toString(),
                userData[0]['Password'].toString()
            );
        });
    });     
});