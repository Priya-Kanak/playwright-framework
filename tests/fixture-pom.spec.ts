import {
    test,
    expect
} from '../fixtures/test.fixtures';

test(
    'verify inventory using fixture',
    async ({ inventoryPage, page }) => {

        await page.goto('/inventory.html');

        await expect(
            page.getByText('Products')
        ).toBeVisible();

    }
);