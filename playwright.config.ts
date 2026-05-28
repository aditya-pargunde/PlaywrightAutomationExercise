import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  timeout: 30000,

  use: {
    baseURL: 'https://automationexercise.com',
    browserName: 'webkit',
    headless: true,
    viewport: null,
    launchOptions: {
      args: [
        '--start-maximized',
        '--disable-notifications',
        '--disable-popup-blocking',
        '--disable-infobars'
      ]
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  projects: [
  {
    name: 'chromium',
    use: { browserName: 'chromium' },
  },
  {
    name: 'firefox',
    use: { browserName: 'firefox' },
  },
  {
    name: 'webkit',
    use: { browserName: 'webkit' },
  }
],

  reporter: [
    ['html'],
    ['allure-playwright']
  ]
});