import { test as base, type Page, type BrowserContext } from '@playwright/test';

export const test = base.extend<{
  page: Page;
  context: BrowserContext;
}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      acceptDownloads: true,
    });
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();

    // Automatically detects and closes the Google Vignette ad whenever it interrupts the flow
    await page.addLocatorHandler(
      page.locator(`//div[@id='ad_position_box']`).filter({
        has: page.locator(`//div[@id='ad_position_box']//div[@class='close-button']/div`),
      }),
      async () => {
        await page.locator(`//div[@id='ad_position_box']//div[@class='close-button']/div`).click();
      },
    );

    await use(page);
    await page.close();
  },
});