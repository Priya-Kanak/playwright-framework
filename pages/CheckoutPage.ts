import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;

    readonly continueButton: Locator;
    readonly finishButton: Locator;

    readonly confirmationMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.firstName =
            page.getByPlaceholder('First Name');

        this.lastName =
            page.getByPlaceholder('Last Name');

        this.postalCode =
            page.getByPlaceholder('Zip/Postal Code');

        this.continueButton =
            page.getByRole('button', {
                name: 'Continue'
            });

        this.finishButton =
            page.getByRole('button', {
                name: 'Finish'
            });

        this.confirmationMessage =
            page.getByText(
                'Thank you for your order!'
            );
    }

    async enterCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);

        await this.continueButton.click();
    }

    async finishOrder() {

        await this.finishButton.click();

    }
}