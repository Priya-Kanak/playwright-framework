import {
    test,
    expect
} from '@playwright/test';

import {
    InventoryPage
} from '../pages/InventoryPage';

import {
    CartPage
} from '../pages/CartPage';

import {
    CheckoutPage
} from '../pages/CheckoutPage';

import {
    checkoutData
} from '../data/test-data';


test(
    'customer can complete purchase @smoke',
    async ({ page }) => {

        const inventoryPage =
            new InventoryPage(page);

        const cartPage =
            new CartPage(page);

        const checkoutPage =
            new CheckoutPage(page);


        await test.step(
            'Open authenticated inventory',
            async () => {

                await page.goto('/inventory.html');

                await expect(
                    page.getByText('Products')
                ).toBeVisible();

            }
        );


        await test.step(
            'Add selected product to cart',
            async () => {

                await inventoryPage.addProduct(
                    checkoutData.product
                );

                await expect(
                    page.locator('.shopping_cart_badge')
                ).toHaveText('1');

            }
        );


        await test.step(
            'Open cart and verify product',
            async () => {

                await inventoryPage.openCart();

                await expect(
                    page.getByText(
                        checkoutData.product,
                        { exact: true }
                    )
                ).toBeVisible();

            }
        );


        await test.step(
            'Enter checkout information',
            async () => {

                await cartPage.checkout();

                await checkoutPage
                    .enterCustomerInformation(
                        checkoutData.customer.firstName,
                        checkoutData.customer.lastName,
                        checkoutData.customer.postalCode
                    );

            }
        );


        await test.step(
            'Complete purchase',
            async () => {

                await checkoutPage.finishOrder();

                await expect(
                    checkoutPage.confirmationMessage
                ).toBeVisible();

            }
        );

    }
);