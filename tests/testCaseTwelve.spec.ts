// Test Case 12: Add Products in Cart
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click 'Products' button
// 5. Hover over first product and click 'Add to cart'
// 6. Click 'Continue Shopping' button
// 7. Hover over second product and click 'Add to cart'
// 8. Click 'View Cart' button
// 9. Verify both products are added to Cart
// 10. Verify their prices, quantity and total price


import { test } from '../fixtures/adHandler.fixture';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';


test.describe('@sanity @regression', () => {

test('TC 12 - Should add products to cart and verify details', async ({ page }) => {

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await page.goto('https://automationexercise.com/');
    await productsPage.goToProductsPage();

    // Get all product titles
    const productTitles = await productsPage.getAllProductTitles();

    // Pick first and second product dynamically
    const firstProduct = productTitles[0];
    const secondProduct = productTitles[1];

    console.log('First Product:', firstProduct);
    console.log('Second Product:', secondProduct);

    // Add first product
    await productsPage.hoverAndAddProductToCart(firstProduct);
    await productsPage.verifyCartAdditionAndContinueShopping();

    // Add second product
    await productsPage.hoverAndAddProductToCart(secondProduct);
    await productsPage.verifyCartAdditionAndGoToCart();

    // Verify cart products
    await cartPage.verifyProductsInCart(firstProduct);
    await cartPage.verifyProductsInCart(secondProduct);

});
});