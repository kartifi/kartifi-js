![example workflow](https://github.com/kartifi/kartifi-js/actions/workflows/playwright.yml/badge.svg)

Kartifi is an open source headless e-commerce platform built with Typescript, Express and React. It is a full-stack e-commerce solution.

## Getting Started
Clone the repository. Go to core directory. Rename the .env.sample file to .env and fill the file with your credentials. 
```bash
$ cd packages/core
$ mv .env.sample .env
```
After filling .env, run the following commands
```bash
$ cd ../../
$ NODE_ENV=development docker-compose up
```
This will start the server, admin, and frontend. Go to http://localhost:5173/products to see the store and http://localhost:5174/products to access the admin panel.

### Placing an order
To place an order, go to any product page. Slect color value  "Red" and Size values "Small". Then click on "Add to Cart" button. Upon successful addition to cart, cart page will be shown. Click on 'Checkout', You will be redirected to login page. Enter the following credentials

email: umair@gmail.com

password: 12345678

After successful login, you will be redirected to checkout page. Enter the details of Shipping address, choose shipping, enter test card details and click on 'Place Order' button. You will be redirected to order confirmation page. Test card details are as follows

Card Number: 4242 4242 4242 4242

Expiry Date: 04/24

CVV: 242
