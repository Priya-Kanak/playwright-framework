import { test, expect } from '@playwright/test';

test('GET API test', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    console.log('Status:', response.status());

    const responseBody = await response.json();

    console.log(responseBody);

    expect(response.status()).toBe(200);

    expect(responseBody.id).toBe(1);

});
test('validate GET response', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.ok()).toBeTruthy();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');

    expect(body.id).toBe(1);

});
test('POST API test', async ({ request }) => {

    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
            data: {
                title: 'Playwright API Test',
                body: 'Learning API testing',
                userId: 1
            }
        }
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody.title)
        .toBe('Playwright API Test');

    expect(responseBody.body)
        .toBe('Learning API testing');

    expect(responseBody.userId)
        .toBe(1);

});
test('PUT API test', async ({ request }) => {

    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                id: 1,
                title: 'Updated title',
                body: 'Updated body',
                userId: 1
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.title).toBe('Updated title');

});
test('DELETE API test', async ({ request }) => {

    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);

});