import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPageLocators } from '../Locators/ProductsPageLocators';

test.describe('@smoke', () => {

test('Verify all categories', async ({ page }) => {

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

   await test.step('Navigate to Automation Exercise home page', async () => {
            await page.goto('https://automationexercise.com/');
        });

        await test.step('Navigate to Products page', async () => {
            await productsPage.goToProductsPage();
            await expect(page.locator(ProductsPageLocators.allProductsHeader)).toBeVisible();
        });

        await test.step('Verify Categories sidebar is displayed', async () => {
            await productsPage.verifyCategoriesSidebar();
        });

        await test.step('Verify Women category and all sub-categories', async () => {
            await productsPage.openWomenDressesCategory();
            await productsPage.openWomenTopsCategory();
            await productsPage.openWomenSareesCategory();
        });

        await test.step('Verify Men category and all sub-categories', async () => {
            await productsPage.openMenTshirtsCategory();
            await productsPage.openMenJeansCategory();
        });

        await test.step('Verify Kids category and all sub-categories', async () => {
            await productsPage.openKidsDressCategory();
            await productsPage.openKidsTopsAndShirtsCategory();
        });

        await test.step('Search for Blue Top product', async () => {
            await productsPage.goToProductsPage();
            await productsPage.searchProduct('Blue Top');
        });

        await test.step('Add Blue Top product to cart', async () => {
            await productsPage.hoverAndAddProductToCart('Blue Top');
            await productsPage.verifyCartAdditionAndGoToCart();
        });

        await test.step('Verify Blue Top is present in the shopping cart', async () => {
            await cartPage.verifyProductsInCart('Blue Top');
        });
});
});