import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@smoke @regression', () => {

    const userData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'UserLogout');

    test('User Login Test', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('https://automationexercise.com/');
        await loginPage.navigateToLoginPage();
        await loginPage.login(
            // 'signuptest@example.com',
            // 'Test123'
            userData[0]['Email'].toString(),
            userData[0]['Password'].toString()
        );
    });
});