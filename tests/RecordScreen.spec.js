import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('button', { name: 'Accept all' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('rahul shetty');
  await page.getByText('rahul shetty academy', { exact: true }).click();
  await page.getByRole('link', { name: 'Rahul Shetty Academy: Selenium, API Testing, Software ... Rahul Shetty Academy https://rahulshettyacademy.com' }).click();
  await page.getByRole('link', { name: 'NEW All Access plan' }).click();
});