import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPageLocators } from '../Locators/ProductsPageLocators';

test.describe('@smoke', () => {

test('Verify all categories', async ({ page }) => {

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await page.goto('https://automationexercise.com/');
    await productsPage.goToProductsPage();

    await expect(productsPage.page.locator(ProductsPageLocators.allProductsHeader)).toBeVisible();
    

    //verify categories sidebar
    await productsPage.verifyCategoriesSidebar();

    //verify all women sub categories are visible and clickable
    await productsPage.openWomenDressesCategory();
    await productsPage.openWomenTopsCategory();
    await productsPage.openWomenSareesCategory();

    //verify all men sub categories are visible and clickable
    await productsPage.openMenTshirtsCategory();
    await productsPage.openMenJeansCategory();

    //verify all kids sub categories are visible and clickable
    await productsPage.openKidsDressCategory();
    await productsPage.openKidsTopsAndShirtsCategory();


    //search product and add to cart
    await productsPage.goToProductsPage();
    await productsPage.searchProduct('Blue Top');
    await productsPage.hoverAndAddProductToCart('Blue Top');
    await productsPage.verifyCartAdditionAndGoToCart();
    await cartPage.verifyProductsInCart('Blue Top');
});
});