import { test, expect } from '@playwright/test';

test('find specific product using filter', async ({ page }) => {

    await page.goto('/inventory.html');

    const product = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    await expect(product).toBeVisible();

});
//Find a button belonging to a specific product

test('add specific product using filter @smoke', async ({ page }) => {

    await page.goto('/inventory.html');

    const product = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    await product
        .getByRole('button', { name: 'Add to cart' })
        .click();

    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');

});

//has — locate based on a child element

const product = page.locator('.inventory_item').filter({

    has: page.getByText(
        'Sauce Labs Backpack',
        { exact: true }
    )

});
        await product
            .getByRole('button', { name: 'Add to cart' })
             .click();

//Locator chaining


//nth(), first() and last()
const products = page.locator('.inventory_item');

await products.first().click();

await products.last().click();

await products.nth(2).click();

//Dynamic table strategy
 const row = page
    .getByRole('row')
    .filter({
        hasText: 'Priya'
    });

await expect(row).toContainText('Active');

await row
    .getByRole('button', { name: 'Edit' })
    .click();

    //iframe
    test('handle iframe', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/iframe'
    );

    const frame = page.frameLocator('#mce_0_ifr');

    const editor = frame.locator('#tinymce');

    await expect(editor).toBeVisible();

});

//interact inside iframe
const frame = page.frameLocator('#mce_0_ifr');

const editor = frame.locator('#tinymce');

await editor.fill('Learning Playwright iframe handling');

await expect(editor).toContainText(
    'Learning Playwright'
);

//Multiple tab
const newPagePromise =
    page.context().waitForEvent('page');

await page.getByText('Open New Tab').click();

const newPage = await newPagePromise;

await newPage.waitForLoadState();

console.log(
    await newPage.title()
);

//pop-up handling
const popupPromise =
    page.waitForEvent('popup');

await page
    .getByRole('button', { name: 'Open' })
    .click();

const popup =
    await popupPromise;

await popup.waitForLoadState();
await expect(popup).toHaveTitle(/Example/);

//cleaner pattern

const [newPage] = await Promise.all([

    page.context().waitForEvent('page'),

    page.getByText('Open New Tab').click()

]);

await newPage.waitForLoadState();

//multiple pages
const pages = page.context().pages();

console.log(
    'Number of tabs:',
    pages.length
);