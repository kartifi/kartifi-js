import { ListProducts } from '../index';
export const IndexProductsRoute = {
  path: "/products",
  loader: async () => {
    let res = await fetch('http://localhost:3000/products')
    res = await res.json()

    return res;
  },
  element: <ListProducts />
}