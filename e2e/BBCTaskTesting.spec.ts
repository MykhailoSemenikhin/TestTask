import { test, expect } from '@playwright/test';

test.describe('Task 1', () => {
  const articlesForReview = 3;

  for ( let i = 1; i <= articlesForReview; i++) {
    test(`Check share information panel content for article ${i}`, async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 1000 });
      await page.goto('https://www.bbc.com/news');

      await page.getByLabel(/^Consent$/).click();

      await page.getByRole('search').click();
      await expect(page).toHaveURL(/.*news_gnl/);

      await page.locator('#search-input').fill('cat');
      await page.locator('#search-input').press('Enter');

      await page.getByTestId('default-promo').nth(i - 1).click();

      try {
        await page.waitForRequest('https://www.bbc.com/wc-data/container/consent-banner');
      } catch (e){
        console.log (`=== Banner in article [${i}] was not shown ===`);
      }
      
      await page.getByTestId('actions:share').click();

      await expect(page.getByRole('button', { name: 'close panel' })).toBeVisible();
      await expect(page.getByTestId('actions:link')).toBeVisible();
      await expect(page.locator("text='About sharing'")).toBeVisible();

    });
  }
});

test.describe('Task 2', () => {
  test(`Check video player exist`, async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto('https://www.bbc.com/news');
    await page.getByLabel(/^Consent$/).click();

    await page.locator("li[class$='__wide-menuitem-container']>a[href^='/news/av/']").click();

    await expect(page.frameLocator("iframe[id *= 'bbcMediaPlayer']").locator('#mediaContainer>button')).toBeVisible({ timeout: 10000 });
  });
});
