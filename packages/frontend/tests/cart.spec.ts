import { test, expect, chromium } from '@playwright/test';

test('Buy a product', async ({ page }) => {
  // const browser = await chromium.launch({ headless: false });
  // const page = await browser.newPage();
  await page.goto('http://localhost:5173/products/1');

  await page.selectOption('#select-Color', 'Red');
  await page.selectOption('#select-Size', 'Small');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  // await page.click('text=Add to cart');


  // await page.waitForSelector('text=Checkout');
  await page.getByRole('button', { name: 'Checkout' }).click();
  // await page.click('text=Checkoout');

  await page.waitForSelector('#email');
  await page.fill('#email', 'umair@gmail.com');
  await page.fill('#password', '12345678');
  await page.getByRole('button', { name: 'Login' }).click();
  // await page.click('text=Login');

  await page.waitForSelector('h1');
  const title = await page.$('#title');
  if (title) {
    await title.fill('Home');
    await page.fill('#firstName', 'umair');
    await page.fill('#lastName', 'hameed');
    await page.fill('#streetAddress1', '340s Lemon Avenue');
    await page.selectOption('#country', 'US');
    await page.selectOption('#state', 'California');
    await page.selectOption('#city', 'Walnut');
    await page.fill('#zipCode', '91789');
    // await page.click('text=Create');
    await page.getByRole('button', { name: 'Create' }).click();


  }

  await page.waitForSelector('input[type="radio"]');
  await page.click('input[type="radio"]');

  await page.waitForSelector('iframe');

  const frame = page.frameLocator('iframe[title="Secure payment input frame"]')
  await frame.locator('#Field-numberInput').fill('4242424242424242');
  await frame.locator('#Field-expiryInput').fill('1227');
  await frame.locator('#Field-cvcInput').fill('123');


  // await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByTestId('order').click();

  await page.waitForSelector('h3');

  expect(page.getByRole('heading', { name: 'Thanks for your order!' })).toBeDefined();

  // await browser.close();

});


