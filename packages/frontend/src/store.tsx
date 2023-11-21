import { create } from "zustand";

export const mainStore = create((set) => ({
    cart: undefined,
    shipping: undefined,
    shippingId: undefined,
    setShipping: (shipping) => set({ shipping }),
    setCart: (cart) => set({ cart }),
    setShippingId: (shippingId) => set({ shippingId })

}))