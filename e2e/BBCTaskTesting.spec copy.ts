import { test, expect } from '@playwright/test';

test('Check share information panel content', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 1000 });
  await page.goto('https://www.bbc.com/news');

  await page.getByLabel(/^Consent$/).click();

  await page.getByRole('search').click();
  await expect(page).toHaveURL(/.*news_gnl/);

  await page.locator('#search-input').fill('cat');
  await page.locator('#search-input').press('Enter');

  await page.getByTestId('default-promo').nth(0).click();

  await page.waitForRequest('https://www.bbc.com/wc-data/container/consent-banner');
  // const requestPromise = page.waitForRequest('https://www.bbc.com/wc-data/container/consent-banner');
  //await page.waitForTimeout(10000);

  // await page.locator('div#dotcom-leaderboard').waitFor({state: "visible"});
  await page.getByTestId('actions:share').click();
  // const request = await requestPromise;

  await expect(page.getByRole('button', { name: 'close panel' })).toBeVisible();
  await expect(page.getByTestId('actions:link')).toBeVisible();
  await expect(page.locator("text='About sharing'")).toBeVisible();

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
