import { ShowOrder } from '../show';
export const ShowOrderRoute = {
    path: "/orders/:id",
    loader: async ({ params }) => {
        let res = await fetch(`http://localhost:3000/orders/${params.id}`)
        res = await res.json()

        return res;
    },
    element: <ShowOrder />
}