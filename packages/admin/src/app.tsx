import { Layout } from './layout';

import { IndexProductsRoute } from './products/routes';
import { NewProductRoute } from './products/routes/new';
import { DeleteProductRoute } from './products/routes/delete';
import { NewOptionRoute } from './options/routes/new';
import { EditOptionRoute } from './options/routes/edit';
import { DeleteOptionRoute } from './options/routes/delete';
import { EditProductRoute } from './products/routes/edit';
import { NewVariantRoute } from './variants/routes/new';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { IndexOrdersRoute } from './orders/routes';
import { ShowOrderRoute } from './orders/routes/show';

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
            NewVariantRoute,
            IndexOrdersRoute,
            ShowOrderRoute
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