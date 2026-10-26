
import { test, expect } from '@playwright/test';

// Advanced locators: filter by text
test('find specific product using filter', async ({ page }) => {
  await page.goto('/inventory.html');

  const product = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  await expect(product).toBeVisible();
});

// Find a button belonging to a specific product
test('add specific product using filter @smoke', async ({ page }) => {
  await page.goto('/inventory.html');

  const product = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  await product
    .getByRole('button', { name: 'Add to cart' })
    .click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// Locate a product using a child element
test('find product using has locator', async ({ page }) => {
  await page.goto('/inventory.html');

  const product = page.locator('.inventory_item').filter({
    has: page.getByText('Sauce Labs Backpack', { exact: true }),
  });

  await expect(product).toBeVisible();
});

// Locator chaining: first, last, nth
test('use first last and nth locators', async ({ page }) => {
  await page.goto('/inventory.html');

  const products = page.locator('.inventory_item');

  await expect(products).toHaveCount(6);
  await expect(products.first()).toBeVisible();
  await expect(products.last()).toBeVisible();
  await expect(products.nth(2)).toBeVisible();
});

// Dynamic table example using a demo page
test('interact with a dynamic table row', async ({ page }) => {
  await page.setContent(`
    <table>
      <tr><th>Name</th><th>Status</th><th>Action</th></tr>
      <tr>
        <td>Priya</td>
        <td>Active</td>
        <td><button>Edit</button></td>
      </tr>
    </table>
  `);

  const row = page.getByRole('row').filter({ hasText: 'Priya' });

  await expect(row).toContainText('Active');
  await row.getByRole('button', { name: 'Edit' }).click();
});

// Iframe handling
test('handle iframe', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');

  const frame = page.frameLocator('#mce_0_ifr');
  const editor = frame.locator('#tinymce');

  await expect(editor).toBeVisible();
});

// Interact inside an iframe
test('edit content inside iframe', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');

  const editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');

  await expect(editor).toBeVisible();
  await editor.fill('Learning Playwright iframe handling');

  await expect(editor).toContainText('Learning Playwright');
});

// Multiple tabs
test('handle a new tab', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByText('Click Here').click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveTitle(/New Window/);
});

// Popup handling
test('handle a popup window', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByText('Click Here').click(),
  ]);

  await popup.waitForLoadState();
  await expect(popup).toHaveTitle(/New Window/);
});

// Count pages in the current browser context
test('count open tabs', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  await page.getByText('Click Here').click();

  await expect
    .poll(() => page.context().pages().length)
    .toBe(2);
});
