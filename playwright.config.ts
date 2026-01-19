// playwright.config.js
import { defineConfig } from '@playwright/test'
// import * as dotenv from 'dotenv';
// import * as path from 'path';
//
// dotenv.config({ path: path.resolve(__dirname, './.env') });

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 60000,
  retries: process.env.CI ? 2 : 0,

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // project
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--start-maximized'],
        },
        // Atur viewport yang konsisten untuk desktop
        viewport: null,
      },
    },
  ],

})
