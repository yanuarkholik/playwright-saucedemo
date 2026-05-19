import { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv'

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  workers: 1,
  fullyParallel: false,
  use: {
    browserName: 'chromium',
    channel: 'chrome',
    headless: false,
    launchOptions: {
      args: ['--start-maximized']
    },
    viewport: null,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
};

export default config;
