import {test, expect} from '../fixtures/test.fixtures';

test('verify using custom fixtures', async ({loggedInInventoryPage}) =>{
    await expect(loggedInInventoryPage.page.getByText('Products')).toBeVisible();
    await expect(loggedInInventoryPage.page.locator('.inventory_item')).toHaveCount(6);
});