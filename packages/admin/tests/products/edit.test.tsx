import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import * as React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routerConfig } from "../../src/app";
import { makeServer } from '../mocks/products';

let server;
beforeEach(() => {
    server = makeServer()
});
afterEach(() => {
    server.shutdown()
});

function addOption() {
    fireEvent.click(screen.getByText('Add Option'));
    fireEvent.change(screen.getByPlaceholderText('e.g. Color'), { target: { value: 'Capacity' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. Red, Green, Blue'), { target: { value: '16GB, 32GB' } });
    fireEvent.click(screen.getByText('Save option'));
}

function addVariant() {
    fireEvent.click(screen.getByText('Add Variant'));
    fireEvent.change(screen.getByLabelText('Variant Title'), { target: { value: 'Sandisk USB' } });
    fireEvent.change(screen.getByLabelText('Variant Description'), { target: { value: 'Great for data transfer' } });
    fireEvent.change(screen.getByLabelText('Variant Price'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('Sale Price'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Capacity'), { target: { value: '16GB' } });
    fireEvent.click(screen.getByText('Save variant'));
}

describe('Product Edit Form', () => {


    beforeEach(() => {

        const router = createMemoryRouter(routerConfig, {
            initialEntries: ['/products/1/edit'],
        });

        render(<RouterProvider router={router} />);
    });

    test('Should create option', async () => {
        await waitFor(() => screen.getByText('Add Option'));
        addOption();
        await waitFor(() => screen.getAllByText(/Capacity/i));
    });

    test('Should create variant', async () => {
        await waitFor(() => screen.getByText('Add Variant'));
        addOption();
        await waitFor(() => screen.getByText(/Capacity/i));
        addVariant()
        await waitFor(() => screen.getAllByText(/USB/i));
    });

    test('Should update product', async () => {

        await waitFor(() => screen.getAllByText('Add Variant'));
        addOption();
        await waitFor(() => screen.getAllByText(/Capacity/i));
        addVariant()

        fireEvent.change(screen.getByLabelText('Product title'), { target: { value: 'Great USB' } });
        fireEvent.change(screen.getByLabelText('Product description'), { target: { value: 'Awesome for storage' } });
        fireEvent.click(screen.getByText('Save product'));
        await waitFor(() => screen.getByText('Updated'));
    });
});