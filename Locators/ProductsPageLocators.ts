export const ProductsPageLocators = {

    // Navigation
    productsMenu: '.shop-menu a[href="/products"]',
    allProductsHeader: 'h2:has-text("ALL PRODUCTS")',

    // Search
    searchInput: '#search_product',
    searchButton: '#submit_search',
    searchedProductHeader: 'h2:has-text("Searched Products")',

    // Common
    categorySidebar: '.left-sidebar',
    productItems: '.product-image-wrapper',
    productTitle: '.productinfo.text-center p',
    addToCartButton: '.overlay-content a.add-to-cart',

    cartModal: '#cartModal',
    viewCartButton: '#cartModal a:has-text("View Cart")',
    continueShoppingButton: '#cartModal button:has-text("Continue Shopping")',

    // Women
    womenCategory: 'a[href="#Women"]',

    womenDressSubCategory: 'a[href="/category_products/1"]',
    womenTopsSubCategory: 'a[href="/category_products/2"]',
    womenSareesSubCategory: 'a[href="/category_products/7"]',

    womenDressSubCategoryHeader: 'h2.title',
    womenTopsSubCategoryHeader: 'h2.title',
    womenSareesSubCategoryHeader: 'h2.title',

    // Men
    menCategory: 'a[href="#Men"]',

    menTshirtsSubCategory: 'a[href="/category_products/3"]',
    menJeansSubCategory: 'a[href="/category_products/6"]',

    menTshirtsSubCategoryHeader: 'h2.title',
    menJeansSubCategoryHeader: 'h2.title',

    // Kids
    kidsCategory: 'a[href="#Kids"]',

    kidsDressSubCategory: 'a[href="/category_products/4"]',
    kidsTopsAndShirtsSubCategory: 'a[href="/category_products/5"]',

    kidsDressSubCategoryHeader: 'h2.title',
    kidsTopsAndShirtsSubCategoryHeader: 'h2.title'
};