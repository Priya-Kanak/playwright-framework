import {test, expect} from '../fixtures/test.fixtures';

test('verify using custom fixtures', async ({loggedInPage}) =>{
    await expect(loggedInPage.getByText('Products')).toBeVisible();
    await expect(loggedInPage.locator('.inventory_item')).toHaveCount(6);
});