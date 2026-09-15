import { test, expect } from '@playwright/test';
import { loginUsers } from '../data/test-data';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

for (const user of loginUsers) {

    test(`login test - ${user.username}`, async ({ page }) => {

        await page.goto('/');

        await page
            .getByPlaceholder('Username')
            .fill(user.username);

        await page
            .getByPlaceholder('Password')
            .fill(user.password);

        await page
            .getByRole('button', { name: 'Login' })
            .click();

        if (user.expected === 'success') {

            await expect(page)
                .toHaveURL(/inventory/);

        } else if (user.expected === 'locked') {

            await expect(
                page.locator('[data-test="error"]')
            ).toContainText('locked out');
        }

    });
}