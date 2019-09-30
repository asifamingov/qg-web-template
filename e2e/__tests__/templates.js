const puppeteer = require('puppeteer-core');
const ct = require('../config/constants');

let browser;
let page;


beforeAll(async () => {
  browser = await puppeteer.launch({
    executablePath: ct.CHROME_PATH
  });
  page = await browser.newPage();
});

describe('SWE templates testing', () => {
  test('Autocomplete is working as expected', async () => {
    await page.setViewport({ width: ct.BT_XL, height: 800 });
    await page.goto(`${ct.APP_URL}/docs/components.html`, { waitUntil: 'networkidle0' });
    await page.type('input[id=qg-search-query]', 'jobs', { delay: 20 });
    await page.waitForSelector('.listbox li');
    const list = (await page.$$('.listbox li')).length;
    expect(list).toBeGreaterThan(0);
  }, 5000);

  test('Feedback form is working as expected', async () => {
    const pfd = '#page-feedback-useful';
    await page.waitForSelector(pfd);
    expect(
      await page.evaluate(
        'window.getComputedStyle(document.getElementById(\'qg-page-feedback\')).getPropertyValue("display")'
      )
    ).toBe('none');
    (await page.$(pfd)).click();
    await page.waitFor(3000);
    expect(
      await page.evaluate(
        'window.getComputedStyle(document.getElementById(\'qg-page-feedback\')).getPropertyValue("display")'
      )
    ).not.toBe('none');
  });
  afterAll(async () => {
    await browser.close();
  });
});
