import { expect, Page, Locator, FrameLocator } from '@playwright/test';

export class BBCHelper {
    readonly page: Page;
    readonly searchField: Locator;
    readonly articles: Locator;
    readonly shareMenu: Locator;
    readonly shareMenuCloseButton: Locator;
    readonly shareMenuCloseLink: Locator;
    readonly shareMenuCloseAbout: Locator;
    readonly videoMenuButton: Locator;
    readonly videoFrame: FrameLocator;
    readonly video: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchField = page.getByRole('search');
        this.articles = page.getByTestId('default-promo');
        this.shareMenu =  page.getByTestId('actions:share');
        this.shareMenuCloseButton =  page.getByRole('button', { name: 'close panel' });
        this.shareMenuCloseLink = page.getByTestId('actions:link');
        this.shareMenuCloseAbout = page.locator("text='About sharing'");
        this.videoMenuButton = page.locator("li[class$='__wide-menuitem-container']>a[href^='/news/av/']");
        this.videoFrame = page.frameLocator("iframe[id *= 'bbcMediaPlayer']");
        this.video = this.videoFrame.locator('#mediaContainer>button');
    }

    async screenSize( size: string ) {
        switch (size) {
            case "normal":
                await this.page.setViewportSize({ width: 1200, height: 900 });
            break;

        default: 
            alert('Default size remove using current function');
        }

        await this.page.goto('https://www.bbc.com/news');
      }
    
    async goto() {
      await this.page.goto('https://www.bbc.com/news');
    }

    async cookiesPopupAccept( accept : true) {
        try {
            if (accept) {
                await this.page.getByLabel(/^Consent$/).click();
            } else {
                await this.page.getByLabel(/^Decline$/).click();
            }
          } catch (e){
            console.log (`=== No cookies message was shown ===`);
        }
    }
    
    async searchSomeValue( value : string) {
        await this.searchField.click();
        await expect(this.page).toHaveURL(/.*news_gnl/);

        await this.page.locator('#search-input').fill(value);
        await this.page.locator('#search-input').press('Enter');
    }

    async openArticlesAfterSearch( articleNumber : number) {
        await this.articles.nth(articleNumber - 1).click();

        try {
          await this.page.waitForRequest('https://www.bbc.com/wc-data/container/consent-banner');
        } catch (e){
          console.log (`=== Banner in article [${i}] was not shown ===`);
        }
    }
    
    async openAndReviewShareMenuElements() {
        await this.shareMenu.click();

        await expect(this.shareMenuCloseButton).toBeVisible();
        await expect(this.shareMenuCloseLink).toBeVisible();
        await expect(this.shareMenuCloseAbout).toBeVisible();
    }

    async openVideoBlock() {
        await this.videoMenuButton.click({ delay: 2000 });
    }

    async checkThatVideoExist(InternetSpeed: string) {
        let waitTime = 300;

        switch (InternetSpeed) {
            case "normal":
                waitTime = 10000;
            break;

        default: 
        }
        
        await expect(this.video).toBeVisible({ timeout: waitTime });
    }

}