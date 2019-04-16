import { USERNAME, PASS } from '../config';

const delay = timeout => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

describe('Jackie', () => {
  describe('Login page', () => {
    beforeAll(async () => {
      await page.goto('https://apneu.cz/admin/');
    });

    it('should be titled Apneu.cz', async () => {
      await page.setViewport({ width: 1920, height: 1080 });
      await page.screenshot({ path: './tests/screenshot/loginPage.jpg' });
      await expect(page.title()).resolves.toMatch('Apneu.cz');
    });
  });

  describe('In Jackie', () => {
    beforeAll(async () => {
      await page.goto('https://apneu.cz/admin/');
      await page.setViewport({ width: 1920, height: 1080 });
      await page.waitForSelector('#login_form__username', { timeout: 1000 });
      await page.type('#login_form__username', USERNAME);
      await page.type('#login_form__password', PASS);
      await page.click('button[type=submit]');
      await page.waitForSelector('#main-menu');
      await delay(500);
    });

    it('should show reservations on dashboard', async () => {
      await expect(page).toMatch('DNEŠNÍ REZERVACE DÍLEN');
    });

    afterAll(async () => {
      await page.screenshot({ path: `./tests/screenshot/${Date.now()}.jpg` });
    });
  });
});
