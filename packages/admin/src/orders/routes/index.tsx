import { ListOrders } from '../index';
export const IndexOrdersRoute = {
    path: "/orders",
    loader: async () => {
        let res = await fetch('http://localhost:3000/orders')
        res = await res.json()

        return res;
    },
    element: <ListOrders />
}