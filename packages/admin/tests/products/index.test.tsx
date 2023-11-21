
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import * as React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { App, routerConfig } from "../../src/app";

import { makeServer } from '../mocks/products';

let server;

beforeEach(() => {
    server = makeServer()
})

afterEach(() => {
    server.shutdown()
})

describe('Products Page', () => {


    beforeEach(() => {
        window.history.pushState({}, 'Products', '/products')
        render(
            <App />


        );

    });

    test('Should list products', async () => {

        // await waitFor(() => screen.getByText(/Gorgeous/i));

    });

});