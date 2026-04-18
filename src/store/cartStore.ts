import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  items: { [productId: string]: number }; // productId to quantity mapping
  addToCart: (productId: string) => void;
  reduceFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      addToCart: (productId) =>
        set((state) => {
          const currentQuantity = state.items[productId] || 0;
          return {
            items: {
              ...state.items,
              [productId]: currentQuantity + 1,
            },
          };
        }),
      reduceFromCart: (productId) =>
        set((state) => {
          const currentQuantity = state.items[productId] || 0;
          if (currentQuantity > 0) {
            return {
              items: {
                ...state.items,
                [productId]: currentQuantity - 1,
              },
            };
          }
          return state; // No change if quantity is already 0
        }),
      clearCart: () => set({ items: {} }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useCartStore;
