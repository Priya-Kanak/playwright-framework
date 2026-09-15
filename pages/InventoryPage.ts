import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {

    readonly page: Page;
    readonly products: Locator;
    readonly productsTitle: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {

        this.page = page;

        this.products =
            page.locator('.inventory_item');

        this.productsTitle =
            page.getByText('Products');

        this.cartBadge =
            page.locator('.shopping_cart_badge');
    }

    async verifyProductCount(count: number) {
        await expect(this.products).toHaveCount(count);
    }

    async verifyProductsTitle() {
        await expect(this.productsTitle).toBeVisible();
    }

    async addProductToCart(productName: string) {

        const product = this.products.filter({
            hasText: productName
        });

        await product
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async verifyCartCount(count: string) {
        await expect(this.cartBadge).toHaveText(count);
    }
    async addProduct(productName: string) {

    const product = this.page
        .locator('.inventory_item')
        .filter({
            hasText: productName
        });

    await product
        .getByRole('button', {
            name: 'Add to cart'
        })
        .click();
}

async openCart() {

    await this.page
        .locator('.shopping_cart_link')
        .click();
}
}