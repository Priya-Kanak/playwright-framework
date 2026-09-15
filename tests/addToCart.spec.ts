import {test, expect} from '../fixtures/test.fixtures';

test('add backpack to fixture', async({loggedInPage}) =>{

    const backpack = loggedInPage.locator('.inventory_item')
    .filter({hasText: 'Sauce Labs Backpack'});
});