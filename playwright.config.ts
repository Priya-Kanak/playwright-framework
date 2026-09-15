import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({

  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail CI if test.only is accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests twice on CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker on CI
  workers: process.env.CI ? 1 : undefined,

  // Generate HTML report
  reporter: 'html',

  // Common configuration
  use: {
    baseURL: env.baseUrl,
    trace: 'on-first-retry',
     screenshot: 'only-on-failure',
     video: 'retain-on-failure',
  },

  projects: [

    // Authentication setup
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Chromium
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/user.json',
      },

      dependencies: ['setup'],
    },

    // Firefox
    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox'],
        storageState: 'auth/user.json',
      },

      dependencies: ['setup'],
    },

    // WebKit
    {
      name: 'webkit',

      use: {
        ...devices['Desktop Safari'],
        storageState: 'auth/user.json',
      },

      dependencies: ['setup'],
    },

  ],

});