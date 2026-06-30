import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductsPageLocators } from '../Locators/ProductsPageLocators';

export class ProductsPage extends BasePage {

    readonly productsMenu: Locator;
    readonly allProductsHeader: Locator;

    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchedProductHeader: Locator;
    readonly categorySidebar: Locator;

    readonly productItems: Locator;
    readonly cartModal: Locator;
    readonly viewCartButton: Locator;
    readonly continueShoppingButton: Locator;

    // Women
    readonly womenCategory: Locator;
    readonly womenDressSubCategory: Locator;
    readonly womenDressSubCategoryHeader: Locator;
    readonly womenTopsSubCategory: Locator;
    readonly womenTopsSubCategoryHeader: Locator;
    readonly womenSareesSubCategory: Locator;
    readonly womenSareesSubCategoryHeader: Locator;

    // Men
    readonly menCategory: Locator;
    readonly menTshirtsSubCategory: Locator;
    readonly menTshirtsSubCategoryHeader: Locator;
    readonly menJeansSubCategory: Locator;
    readonly menJeansSubCategoryHeader: Locator;

    // Kids
    readonly kidsCategory: Locator;
    readonly kidsDressSubCategory: Locator;
    readonly kidsDressSubCategoryHeader: Locator;
    readonly kidsTopsAndShirtsSubCategory: Locator;
    readonly kidsTopsAndShirtsSubCategoryHeader: Locator;

    constructor(page: Page) {

        super(page);

        // Navigation
        this.productsMenu = page.locator(ProductsPageLocators.productsMenu);
        this.allProductsHeader = page.locator(ProductsPageLocators.allProductsHeader);

        // Search
        this.searchInput = page.locator(ProductsPageLocators.searchInput);
        this.searchButton = page.locator(ProductsPageLocators.searchButton);
        this.searchedProductHeader = page.locator(ProductsPageLocators.searchedProductHeader);

        // Common
        this.categorySidebar = page.locator(ProductsPageLocators.categorySidebar);
        this.productItems = page.locator(ProductsPageLocators.productItems);
        this.cartModal = page.locator(ProductsPageLocators.cartModal);
        this.viewCartButton = page.locator(ProductsPageLocators.viewCartButton);
        this.continueShoppingButton = page.locator(ProductsPageLocators.continueShoppingButton);
        // Women
        this.womenCategory = page.locator(ProductsPageLocators.womenCategory);
        this.womenDressSubCategory = page.locator(ProductsPageLocators.womenDressSubCategory);
        this.womenDressSubCategoryHeader = page.locator(ProductsPageLocators.womenDressSubCategoryHeader);
        this.womenTopsSubCategory = page.locator(ProductsPageLocators.womenTopsSubCategory);
        this.womenTopsSubCategoryHeader = page.locator(ProductsPageLocators.womenTopsSubCategoryHeader);
        this.womenSareesSubCategory = page.locator(ProductsPageLocators.womenSareesSubCategory);
        this.womenSareesSubCategoryHeader = page.locator(ProductsPageLocators.womenSareesSubCategoryHeader);

        // Men
        this.menCategory = page.locator(ProductsPageLocators.menCategory);
        this.menTshirtsSubCategory = page.locator(ProductsPageLocators.menTshirtsSubCategory);
        this.menTshirtsSubCategoryHeader = page.locator(ProductsPageLocators.menTshirtsSubCategoryHeader);
        this.menJeansSubCategory = page.locator(ProductsPageLocators.menJeansSubCategory);
        this.menJeansSubCategoryHeader = page.locator(ProductsPageLocators.menJeansSubCategoryHeader);

        // Kids
        this.kidsCategory = page.locator(ProductsPageLocators.kidsCategory);
        this.kidsDressSubCategory = page.locator(ProductsPageLocators.kidsDressSubCategory);
        this.kidsDressSubCategoryHeader = page.locator(ProductsPageLocators.kidsDressSubCategoryHeader);
        this.kidsTopsAndShirtsSubCategory = page.locator(ProductsPageLocators.kidsTopsAndShirtsSubCategory);
        this.kidsTopsAndShirtsSubCategoryHeader = page.locator(ProductsPageLocators.kidsTopsAndShirtsSubCategoryHeader);
    }

    async goToProductsPage() {
        await this.productsMenu.click();
        await this.page.waitForLoadState("networkidle");
       // await expect(this.allProductsHeader).toBeVisible();
    }

    async searchProduct(productName: string) {
        await this.fillInput(this.searchInput, productName);
        await this.searchButton.click();
        await expect(this.searchedProductHeader).toBeVisible();
        await expect(this.productItems.first()).toBeVisible();
    }

    async hoverAndAddProductToCart(expectedProduct: string) {

        const count = await this.productItems.count();

        if (count === 0) {
            throw new Error('No products found for the searched term.');
        }

        for (let i = 0; i < count; i++) {
            const productCard = this.productItems.nth(i);
            const productName = await productCard.locator(ProductsPageLocators.productTitle).textContent();
            if (productName?.trim().includes(expectedProduct)) {
                console.log(`Found product: ${productName}`);
                await productCard.scrollIntoViewIfNeeded();
                await productCard.hover();
                const addToCartButton = productCard.locator(ProductsPageLocators.addToCartButton);
                await expect(addToCartButton).toBeVisible();
                await addToCartButton.click();
                console.log(`Added product to cart: ${productName}`);
                return;
            }
        }
        throw new Error(`Product "${expectedProduct}" not found.`);
    }

    async getAllProductTitles(): Promise<string[]> {
        const count = await this.productItems.count();
        const productTitles: string[] = [];
        for (let i = 0; i < count; i++) {
            const productCard = this.productItems.nth(i);
            const productName = await productCard.locator(ProductsPageLocators.productTitle).textContent();
            if (productName) {
                productTitles.push(productName.trim());
            }
        }
        return productTitles;
    }

    async verifyCartAdditionAndGoToCart() {
        await expect(this.cartModal).toBeVisible();
        await this.viewCartButton.click();
    }

    async verifyCartAdditionAndContinueShopping() {
        await expect(this.cartModal).toBeVisible();
        await this.continueShoppingButton.click();
    }

    async verifyCategoriesSidebar() {
        await expect(this.categorySidebar).toBeVisible();
        await expect(this.womenCategory).toBeVisible();
        await expect(this.menCategory).toBeVisible();
        await expect(this.kidsCategory).toBeVisible();
    }

    async expandWomenCategory() {
        await this.womenCategory.click();
        await expect(this.womenDressSubCategory).toBeVisible();
        await expect(this.womenTopsSubCategory).toBeVisible();
        await expect(this.womenSareesSubCategory).toBeVisible();
    }

    async openWomenDressesCategory() {
        await this.womenCategory.click();
        await expect(this.womenDressSubCategory).toBeVisible();
        await this.womenDressSubCategory.click();
        await expect(this.womenDressSubCategoryHeader).toContainText('Women - Dress Products');
        await expect(this.productItems.first()).toBeVisible();
      //  await this.page.waitForURL('**/category_products/1');
    }

    async openWomenTopsCategory() {
        await this.womenCategory.click();
        await expect(this.womenTopsSubCategory).toBeVisible();
        await this.womenTopsSubCategory.click();
        await expect(this.womenTopsSubCategoryHeader).toContainText('Women - Tops Products');
        await expect(this.productItems.first()).toBeVisible();
       // await this.page.waitForURL('**/category_products/2');
    }

    async openWomenSareesCategory() {
        await this.womenCategory.click();
        await expect(this.womenSareesSubCategory).toBeVisible();
        await this.womenSareesSubCategory.click();
        await expect(this.womenSareesSubCategoryHeader).toContainText('Women - Saree Products');
        await expect(this.productItems.first()).toBeVisible();
      //  await this.page.waitForURL('**/category_products/7');
    }

    async expandMenCategory() {
        await this.menCategory.click();
        await expect(this.menTshirtsSubCategory).toBeVisible();
        await expect(this.menJeansSubCategory).toBeVisible();
    }

    async openMenTshirtsCategory() {
        await this.menCategory.click();
        await expect(this.menTshirtsSubCategory).toBeVisible();
        await this.menTshirtsSubCategory.click();
        await expect(this.menTshirtsSubCategoryHeader).toContainText('Men - Tshirts Products');
        await expect(this.productItems.first()).toBeVisible();
      //  await this.page.waitForURL('**/category_products/3');
    }

    async openMenJeansCategory() {
        await this.menCategory.click();
        await expect(this.menJeansSubCategory).toBeVisible();
        await this.menJeansSubCategory.click();
        await expect(this.menJeansSubCategoryHeader).toContainText('Men - Jeans Products');
        await expect(this.productItems.first()).toBeVisible();
      //  await this.page.waitForURL('**/category_products/6');
    }

    async expandKidsCategory() {
        await this.kidsCategory.click();
        await expect(this.kidsDressSubCategory).toBeVisible();
        await expect(this.kidsTopsAndShirtsSubCategory).toBeVisible();
    }

    async openKidsDressCategory() {
        await this.kidsCategory.click();
        await expect(this.kidsDressSubCategory).toBeVisible();
        await this.kidsDressSubCategory.click();
        await expect(this.kidsDressSubCategoryHeader).toContainText('Kids - Dress Products');
        await expect(this.productItems.first()).toBeVisible();
      //  await this.page.waitForURL('**/category_products/4');
    }

    async openKidsTopsAndShirtsCategory() {
        await this.kidsCategory.click();
        await expect(this.kidsTopsAndShirtsSubCategory).toBeVisible();
        await this.kidsTopsAndShirtsSubCategory.click();
        await expect(this.kidsTopsAndShirtsSubCategoryHeader).toContainText('Kids - Tops & Shirts Products');
        await expect(this.productItems.first()).toBeVisible();
     //   await this.page.waitForURL('**/category_products/5');
    }
}