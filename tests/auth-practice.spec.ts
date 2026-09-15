import { test, expect } from '@playwright/test';

test('user should already be authenticated @regression', async ({ page }) => {

    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/inventory/);

    await expect(
        page.getByText('Products')
    ).toBeVisible();

});