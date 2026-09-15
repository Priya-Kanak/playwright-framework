import {test} from '../fixtures/test.fixtures';
import { testData } from '../data/test-data';

test('add product using environment and test data', async({
    loggedInInventoryPage
}) => {
    await loggedInInventoryPage.verifyProductCount(
        testData.expectedProductCount
    );

    await loggedInInventoryPage.addProductToCart(
        testData.products.backpack
    );

    await loggedInInventoryPage.verifyCartCount('1');


});
