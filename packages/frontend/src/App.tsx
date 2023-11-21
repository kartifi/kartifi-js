import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './layouts'
import { IndexProductsRoute } from './products/routes';
import { ShowProductRoute } from './products/routes/show';
import { CreateLineItemRoute } from './line-items/routes/create';
import { CartCreateRoute } from './cart/routes/create';
import { CartIndexRoute } from './cart/routes';
import { EditLineItemRoute } from './line-items/routes/edit';
import { IndexCheckoutRoute } from './checkout/routes';
import { LoginRoute } from './auth/routes/login';
import { CreateAddressRoute } from './address/routes/create';
import { CartEditRoute } from './cart/routes/edit';
import { TaxRoute } from './checkout/routes/tax';
import { PaymentIntentRoute } from './checkout/routes/payment-intent';
import { ThanksRoute } from './checkout/routes/thanks';

export const routerConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      IndexProductsRoute,
      ShowProductRoute,
      CreateLineItemRoute,
      EditLineItemRoute,
      CartIndexRoute,
      CartCreateRoute,
      CartEditRoute,
      IndexCheckoutRoute,
      LoginRoute,
      CreateAddressRoute,
      TaxRoute,
      PaymentIntentRoute,
      ThanksRoute

    ]
  },

]



function App() {

  const router = createBrowserRouter(routerConfig);
  return (

    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
