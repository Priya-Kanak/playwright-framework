import {test as base, expect, Page} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';
import { env } from '../config/env';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    loggedInInventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({page},use) =>{
      const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    loggedInInventoryPage: async({
      page,loginPage
    },use)=>{
           await loginPage.login(
            env.username,
            env.password
        );
        await expect(page).toHaveURL(/inventory/);

        const inventoryPage =
            new InventoryPage(page);

        await use(inventoryPage);
    },
      
    });

export { expect };