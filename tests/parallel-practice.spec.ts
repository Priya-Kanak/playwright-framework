import { test, expect } from '@playwright/test';

test.describe('Parallel testing @regression', () => {
test('Product test 1', async ({ page }) => {

    console.log('Test 1 started');

    await page.goto('/inventory.html');

    await expect(
        page.getByText('Products')
    ).toBeVisible();

    console.log('Test 1 finished');
});


test('Product test 2', async ({ page }) => {

    console.log('Test 2 started');

    await page.goto('/inventory.html');

    await expect(
        page.locator('.inventory_item')
    ).toHaveCount(6);

    console.log('Test 2 finished');
});


test('Product test 3', async ({ page }) => {

    console.log('Test 3 started');

    await page.goto('/inventory.html');

    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

    console.log('Test 3 finished');
});
});