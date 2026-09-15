export const testData = {
    products: {
        backpack: 'Sauce Labs Backpack',
        bikeLight: 'Sauce Labs Bike Light'
    },

    expectedProductCount: 6
};
export const loginUsers = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        expected: 'success'
    },

    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        expected: 'locked'
    },

    {
        username: 'problem_user',
        password: 'secret_sauce',
        expected: 'success'
    }
];

export const checkoutData = {

    product: 'Sauce Labs Backpack',

    customer: {
        firstName: 'Test',
        lastName: 'User',
        postalCode: '560001'
    }

};