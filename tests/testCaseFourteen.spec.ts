// Test Case 14: Place Order: Register while Checkout
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Add products to cart
// 5. Click 'Cart' button
// 6. Verify that cart page is displayed
// 7. Click Proceed To Checkout
// 8. Click 'Register / Login' button
// 9. Fill all details in Signup and create account
// 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
// 11. Verify ' Logged in as username' at top
// 12.Click 'Cart' button
// 13. Click 'Proceed To Checkout' button
// 14. Verify Address Details and Review Your Order
// 15. Enter description in comment text area and click 'Place Order'
// 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
// 17. Click 'Pay and Confirm Order' button
// 18. Verify success message 'Your order has been placed successfully!'
// 19. Click 'Delete Account' button
// 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button


//import { test, expect } from '@playwright/test';
import { test } from '../fixtures/adHandler.fixture';
import { expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { ExcelUtils } from '../utils/ExcelUtils';

test.describe('@sanity', () => {

const userData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'RegisterUsers');
const cardData: any[] = ExcelUtils.getSheetData('./test-data/users.xlsx', 'CardDetails');

for (let i = 0; i < userData.length; i++) {

    const user = userData[i];
    const card = cardData[i];

    test(`TC 14 - Place Order: Register while Checkout Test`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const productsPage = new ProductsPage(page);
        const checkoutPage = new CheckoutPage(page);
        const paymentPage = new PaymentPage(page);
        const orderConfirmationPage = new OrderConfirmationPage(page);

        await page.goto('https://automationexercise.com/');

        await productsPage.goToProductsPage();
        await productsPage.searchProduct('Blue Top');
        await productsPage.hoverAndAddProductToCart('Blue Top');

        await productsPage.verifyCartAdditionAndGoToCart();

        await cartPage.verifyProductsInCart('Blue Top');
        await cartPage.proceedToCheckout();
        await cartPage.verifyLoginOnCheckout();

        await signupPage.enterSignupDetails(
            user['Name'],
            user['Email'].toString()
        );

        await signupPage.fillAccountInformation(
            user['Password'].toString(),
            user['Day'].toString(),
            user['Month'].toString(),
            user['Year'].toString()
        );

        await signupPage.fillAddressInformation(
            user['First Name'],
            user['Last Name'],
            user['Address'],
            user['Country'],
            user['State'],
            user['City'],
            user['Zipcode'].toString(),
            user['Mobile number'].toString()
        );

        await signupPage.clickCreateAccountButton();
        await signupPage.clickContinueButton();
        await homePage.navigateToCartPage();
        await cartPage.proceedToCheckout();
        await checkoutPage.compareAddresses();
        await checkoutPage.reviewOrder();
        await checkoutPage.verifyPlaceOrder();
        await paymentPage.fillPaymentDetails(
            card['Name'].toString(),
            card['Card Number'].toString(),
            card['CVC'].toString(),
            card['Expiry Month'].toString(),
            card['Expiry Year'].toString()
        );
        await paymentPage.clickPayAndConfirmOrderButton();
        await orderConfirmationPage.verifyOrderConfirmation();
        await orderConfirmationPage.verifyDownloadInvoiceLink();
        await homePage.clickDeleteAccount();
        await expect(homePage.accountDeletedHeader).toBeVisible();
    });
}
});