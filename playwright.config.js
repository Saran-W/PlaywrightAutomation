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
   headless : false, // when true there is no browser open with false a browser is opened 
   screenshot : 'on', //when on it there a is a screenshot taken for every step
  //  trace : 'on', // you get detailed report of every step thet is cool for debuging 
   trace : 'retain-on-failure', //you only get traces for only for failled tests
    
  },
};


module.exports = config;