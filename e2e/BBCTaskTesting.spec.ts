import { test, expect } from '@playwright/test';
import { BBCHelper } from './Helper/BBC_Helper';


test.beforeEach(async ({ page }) => {
  const BBC = new BBCHelper(page);

  await BBC.goto();
  await BBC.screenSize('normal');
  await BBC.cookiesPopupAccept(true);
});

test.describe('Task 1', () => {
  const articlesForReview = 3;

  for ( let i = 1; i <= articlesForReview; i++) {
    test(`Check share information panel content for article ${i}`, async ({ page }) => {
      const BBC = new BBCHelper(page);

      
      await BBC.searchSomeValue('cat');
      await BBC.openArticlesAfterSearch(i);
      await BBC.openAndReviewShareMenuElements();
    });
  }
});

test.describe('Task 2', () => {
  test(`Check video player exist`, async ({ page }) => {
    const BBC = new BBCHelper(page);

    await BBC.openVideoBlock();
    await BBC.checkThatVideoExist('normal');
  });
});
