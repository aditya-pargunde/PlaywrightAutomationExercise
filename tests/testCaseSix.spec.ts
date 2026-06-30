// Test Case 6: Contact Us Form
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Contact Us' button
// 5. Verify 'GET IN TOUCH' is visible
// 6. Enter name, email, subject and message
// 7. Upload file
// 8. Click 'Submit' button
// 9. Click OK button
// 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
// 11. Click 'Home' button and verify that landed to home page successfully


import { test } from '../fixtures/adHandler.fixture';
import { expect } from '@playwright/test';

import { BasePage } from '../pages/BasePage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@sanity', () => {

    const Data: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'UserLogout');

    test('TC 6 - Contact Us Form Test', async ({ page }) => {

        const basePage = new BasePage(page);
        const contactUsPage = new ContactUsPage(page);

        await test.step('Launch Automation Exercise application', async () => {
            await page.goto('https://automationexercise.com/');
        });

        await test.step('Navigate to Contact Us page', async () => {
            await basePage.clickElement(basePage.contactUsLink);
            await expect(contactUsPage.contactUsHeader).toBeVisible();
        });

        await test.step('Enter contact form details', async () => {
            await contactUsPage.enterFormDetails(
                Data[0]['Name'].toString(),
                Data[0]['Email'].toString(),
                'Test Subject',
                'This is a test message.'
            );
        });

        await test.step('Upload file attachment', async () => {
            await contactUsPage.verifyFileUpload('./test-data/invoice.txt');
        });

        await test.step('Submit the contact form', async () => {
            await contactUsPage.submitForm();
        });

        await test.step('Verify success message', async () => {
            await contactUsPage.verifySuccessMessage();
        });

    });
});


