const puppeteer = require('puppeteer');
const ct = require('./config/constants');

let browser;
let page;
beforeAll(async () => {
  await page.setViewport({ width: ct.BT_SM, height: ct.WH });
  await page.goto(`${ct.APP_URL}/docs/components.html`, { waitUntil: 'networkidle0' });
});

describe('SWE Mobile Interactions', () => {
  test('Should display the menu clicking menu icon', async () => {
    expect(await page.evaluate("document.querySelector('#qg-site-nav').getAttribute('class')")).not.toMatch(/collapse show/);
    (await page.$('#qg-show-menu')).click();
    await page.waitFor(ct.WT);
    expect(await page.evaluate("document.querySelector('#qg-site-nav').getAttribute('class')")).toMatch(/collapse show/);
  });

  test('Should display the search on clicking search icon', async () => {
    expect(await page.evaluate("document.querySelector('#qg-search-form').getAttribute('class')")).not.toMatch(/col-xs-12 col-md-3 qg-web-autocomplete show/);
    (await page.$('#qg-show-search')).click();
    await page.waitFor(ct.WT);
    expect(await page.evaluate("document.querySelector('#qg-search-form').getAttribute('class')")).toMatch(/col-xs-12 col-md-3 qg-web-autocomplete collapse show/);
  });

  test('Should display the site map', async () => {
    expect(await page.evaluate("document.querySelector('#footer-info-qg').getAttribute('class')")).not.toMatch(/collapse show/);
    (await page.$('.qg-toggle-icon-right')).click();
    await page.waitFor(ct.WT);
    expect(await page.evaluate("document.querySelector('#footer-info-qg').getAttribute('class')")).toMatch(/collapse show/);
  });

  afterAll(async () => {
    await browser.close();
  });
});
