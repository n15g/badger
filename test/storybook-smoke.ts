import assert from 'node:assert/strict'
import { test } from 'node:test'
import { chromium } from 'playwright'
import { preview } from 'vite'

// Vitest uses a different mock runtime. Check the bundle that Storybook actually serves, too.
void test('built Storybook renders a story with its isolated database', { timeout: 30_000 }, async (t) => {
  const server = await preview({
    configFile: false,
    build: { outDir: 'storybook-static' },
    preview: { host: '127.0.0.1', port: 0, open: false },
  })
  t.after(() => server.close())
  const url = server.resolvedUrls?.local[0]
  assert.ok(url, 'Storybook preview must have a local URL')

  const browser = await chromium.launch()
  t.after(() => browser.close())
  const page = await browser.newPage()
  page.on('pageerror', error => {
    console.error(error)
  })
  page.on('console', message => {
    if (message.type() === 'error') console.error(message.text())
  })

  await page.goto(`${url}iframe.html?id=character-badgecount--none&viewMode=story`)
  await page.getByText('0 badges', { exact: true }).waitFor({ timeout: 15_000 })
  const databases = await page.evaluate(() => indexedDB.databases())
  assert.equal(databases.length, 1)
  assert.ok(databases[0].name?.startsWith('badger-story-'))
})
