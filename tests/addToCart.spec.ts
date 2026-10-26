import {test, expect} from '../fixtures/test.fixtures';

test('add backpack to fixture', async({loggedInInventoryPage }) =>{

    const backpack = loggedInInventoryPage.page
    .locator('.inventory_item')
    .filter({hasText: 'Sauce Labs Backpack'});

    await backpack.getByRole('button', {name: 'Add to cart'}).click();

    await expect(loggedInInventoryPage.page.locator('.shopping_cart_badge')).toHaveText('1');});


});