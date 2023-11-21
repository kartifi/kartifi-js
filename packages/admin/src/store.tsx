import { create } from "zustand";

export const mainStore = create((set) => ({
    options: [],
    variants: [],
    setOptions: (productOptions) => set(() => ({ options: productOptions })),
    setVariants: (varaints) => set(() => ({ variants: varaints })),


}))