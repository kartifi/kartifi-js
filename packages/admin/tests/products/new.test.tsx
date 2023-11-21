
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import * as React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routerConfig } from "../../src/app";

import { makeServer } from '../mocks/products';

let server




function addOption() {
    fireEvent.click(screen.getByText('Add Option'));
    fireEvent.change(screen.getByPlaceholderText('e.g. Color'), { target: { value: 'Size' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. Red, Green, Blue'), { target: { value: 'Medium, Large' } });
    fireEvent.click(screen.getByText('Save option'));
}

function addVariant() {
    fireEvent.click(screen.getByText('Add Variant'));
    fireEvent.change(screen.getByLabelText('Variant Title'), { target: { value: 'Colorful Tshirt' } });
    fireEvent.change(screen.getByLabelText('Variant Description'), { target: { value: 'Awesome for wedding' } });
    fireEvent.change(screen.getByLabelText('Variant Price'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('Sale Price'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Size'), { target: { value: 'Small' } });
    fireEvent.click(screen.getByText('Save variant'));
}

beforeEach(() => {
    server = makeServer()
    //  If your API is at a different port or host than your app, you'll need something like:
    //  server = createServer({
    //    environment: "test",
    //    urlPrefix: "http://api.acme.com:3000",
    //  })
})

afterEach(() => {
    server.shutdown()
})

describe('Product Form', () => {


    beforeEach(() => {

        render(
            <RouterProvider router={createMemoryRouter(routerConfig, {
                initialEntries: ['/products/new'],
            })} />


        );

    });

    test('Should create option', async () => {

        await waitFor(() => screen.getByText('Add Option'));
        addOption();
        await waitFor(() => screen.getByText(/Size/i));
        expect(screen.getByText(/Size/i)).toBeDefined();
    });

    test('Should create variant', async () => {

        await waitFor(() => screen.getByText('Add Variant'));
        addOption();
        await waitFor(() => screen.getByText(/Size/i));
        addVariant()
        await waitFor(() => screen.getByText(/Colorful Tshirt/i));
    });

    test('Should create product', async () => {

        await waitFor(() => screen.getByText('Add Variant'));
        addOption();
        await waitFor(() => screen.getByText(/Size/i));
        addVariant()

        fireEvent.change(screen.getByLabelText('Product title'), { target: { value: 'Tshirt' } });
        fireEvent.change(screen.getByLabelText('Product description'), { target: { value: 'Tshirt' } });
        fireEvent.click(screen.getByText('Save product'));
        await waitFor(() => screen.getByText('Saved'));
    });
});