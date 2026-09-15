import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test(' test and add product using POM', async ({page}) =>{

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user',
        'secret_sauce');

    await expect(page).toHaveURL('/inventory/');
    await inventoryPage.verifyProductsTitle();

    await inventoryPage.verifyProductCount(6);

    await inventoryPage.addProductToCart(
        'Sauce Labs Backpack'
    );

    await inventoryPage.verifyCartCount('1');

});