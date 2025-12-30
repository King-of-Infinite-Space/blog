import { test, expect } from '@playwright/test';

const pageUrl = '/2208-人-生-几何';

test.describe('Footnote references', () => {
  test('footnote refs do not end with colon numbers', async ({ page }) => {
    await page.goto(pageUrl);
    await page.waitForSelector('.vp-doc');

    const footnoteRefs = page.locator('sup.footnote-ref > a');
    const count = await footnoteRefs.count();

    for (let i = 0; i < count; i += 1) {
      const text = await footnoteRefs.nth(i).innerText();
      console.log(text)
      expect(text).not.toMatch(/:\d+/);
    }
  });
});
