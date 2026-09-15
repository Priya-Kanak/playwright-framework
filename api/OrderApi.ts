import {
    APIRequestContext
} from '@playwright/test';

import {
    HttpError
} from '../utils/HttpError';

import {
    retry,
    isRetryableError
} from '../utils/retry';


export class OrderApi {

    constructor(
        private request: APIRequestContext
    ) {}


    async getOrder(orderId: string) {

        return retry(

            async () => {

                const response =
                    await this.request.get(
                        `/orders/${orderId}`
                    );

                if (!response.ok()) {

                    throw new HttpError(
                        response.status(),
                        `Get order failed: ${response.status()}`
                    );
                }

                return response.json();

            },

            isRetryableError,

            {
                maxAttempts: 3,
                delayMs: 1000
            }
            
        );
    }
}