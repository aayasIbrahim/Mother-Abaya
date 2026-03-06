import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  _id: string;
  name: string;
  discountPrice: number;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
    
      cart: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addToCart: (newItem) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item._id === newItem._id && item.size === newItem.size,
          );

          if (existingItemIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += newItem.quantity;
            return { cart: updatedCart, isOpen: true };
          }
          return { cart: [...state.cart, newItem], isOpen: true };
        }),

      removeFromCart: (id, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item._id === id && item.size === size),
          ),
        })),

      updateQuantity: (id, size, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.size === size
              ? { ...item, quantity }
              : item,
          ),
        })),

      // ১. মোট আইটেম সংখ্যা বের করার লজিক
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      // ২. মোট প্রাইস বের করার লজিক

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => {
          // ইন্ডাস্ট্রিয়াল লজিক: যদি ডিসকাউন্ট প্রাইস থাকে এবং তা ০ থেকে বেশি হয় তবে সেটি নাও,
          // অন্যথায় রেগুলার প্রাইস ব্যবহার করো।
          const effectivePrice =
            item.discountPrice > 0 ? item.discountPrice : item.price;
          return total + effectivePrice * item.quantity;
        }, 0);
      },
      clearCart: () => set({ cart: [] }),
    }),
    { name: "mother-abaya-storage" },
  ),
);
