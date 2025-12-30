import { test, expect } from '@playwright/test'

test.describe('Footnote references', () => {
  test('footnote refs do not end with colon numbers', async ({ page }) => {
    const url = '/2208-人-生-几何'
    console.log(url)
    await page.goto(url)
    await page.waitForSelector('.vp-doc')

    const footnoteRefs = page.locator('sup.footnote-ref > a')
    const count = await footnoteRefs.count()

    for (let i = 0; i < count; i += 1) {
      const text = await footnoteRefs.nth(i).innerText()
      console.log(text)
      expect(text).not.toMatch(/:\d+/)
    }
  })

  test('footnote refs have custom text', async ({ page }) => {
    const url = '/2512-owlcat'
    console.log(url)
    await page.goto(url)
    await page.waitForSelector('.vp-doc')

    const footnoteRefs = page.locator('sup.footnote-ref > a')
    const count = await footnoteRefs.count()

    let match = 0
    for (let i = 0; i < count; i += 1) {
      const text = await footnoteRefs.nth(i).innerText()
      console.log(text)
      if (text.match(/\[\w+\]/)) {
        match += 1
      }
    }
    expect(match).toBeGreaterThan(0)
  })
})
