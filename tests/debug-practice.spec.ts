import { test, expect } from '@playwright/test';

test('debug failed product test', async ({ page }) => {

  await page.goto('/inventory.html');

  await expect(
    page.getByText('Products')
  ).toBeVisible();

  // Intentionally WRONG
  await expect(
    page.locator('.inventory_item')
  ).toHaveCount(10);

});