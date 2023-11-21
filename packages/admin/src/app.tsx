import { Layout } from './layout';
import { DarkThemeToggle, Flowbite } from "flowbite-react";

import { IndexProductsRoute } from './products/routes';
import { NewProductRoute } from './products/routes/new';
import { DeleteProductRoute } from './products/routes/delete';
import { NewOptionRoute } from './options/routes/new';
import { EditOptionRoute } from './options/routes/edit';
import { DeleteOptionRoute } from './options/routes/delete';
import { EditProductRoute } from './products/routes/edit';
import { NewVariantRoute } from './variants/routes/new';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const routerConfig = [
    {
        path: "/",
        element: <Layout />,
        children: [
            IndexProductsRoute,
            NewProductRoute,
            EditProductRoute,
            DeleteProductRoute,
            NewOptionRoute,
            EditOptionRoute,
            DeleteOptionRoute,
            NewVariantRoute
        ]
    }
]

export function App() {
    const router = createBrowserRouter(routerConfig);
    return (
        // <Flowbite>
        // {/* <DarkThemeToggle /> */}
        < RouterProvider router={router} />

        // </Flowbite>
    )
}