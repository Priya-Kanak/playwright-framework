import { test, expect } from '@playwright/test';

test('observe network requests', async ({ page }) => {

    page.on('request', request => {
        console.log(
            'REQUEST:',
            request.method(),
            request.url()
        );
    });

    page.on('response', response => {
        console.log(
            'RESPONSE:',
            response.status(),
            response.url()
        );
    });

    await page.goto(
        'https://jsonplaceholder.typicode.com/'
    );

    await expect(page).toHaveTitle(
        /JSONPlaceholder/
    );
});