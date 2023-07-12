// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');

const config = {
  testDir: './tests',

  timeout: 30 * 10000, // for the entire test 
  expect:{

    timeout: 5000 // 5 min for the assersion 
  },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   browserName : 'chromium',
   headless : false // when true there is no browser open whin false a browser is opened 
    
  },
}


module.exports = config;