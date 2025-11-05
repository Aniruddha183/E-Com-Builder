import { create } from "zustand";

const defaultSettings = {
  template: "minimal",
  logo: null,
  logoText: "Your Store",
  primaryColor: "#000000",
  secondaryColor: "#FFFFFF",
  accentColor: "#3B82F6",
  fontFamily: "inter",
  businessName: "Your Store Name",
  businessTagline: "Beautiful products for modern living",
  businessAddress: "123 Main Street, City, State 12345",
  businessEmail: "hello@yourstore.com",
  businessPhone: "+1 (555) 123-4567",
};

const sampleProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation and 30-hour battery life.",
    images: [
      "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "Electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Minimalist Watch",
    price: 199.99,
    description:
      "Timeless design meets modern craftsmanship. This minimalist watch features a sapphire crystal and genuine leather band.",
    images: [
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "Accessories",
    inStock: true,
  },
  {
    id: "3",
    name: "Leather Backpack",
    price: 149.99,
    description:
      "Handcrafted from premium leather, this backpack combines style with functionality. Perfect for work or travel.",
    images: [
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "Bags",
    inStock: true,
  },
  {
    id: "4",
    name: "Smart Fitness Tracker",
    price: 129.99,
    description:
      "Track your fitness goals with precision. Heart rate monitoring, sleep tracking, and GPS navigation.",
    images: [
      "https://images.pexels.com/photos/437039/pexels-photo-437039.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "Electronics",
    inStock: true,
  },
  {
    id: "5",
    name: "Organic Cotton T-Shirt",
    price: 39.99,
    description:
      "Sustainable and comfortable. Made from 100% organic cotton with a perfect fit.",
    images: [
      "https://images.pexels.com/photos/1334602/pexels-photo-1334602.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "Clothing",
    inStock: true,
  },
  {
    id: "6",
    name: "Modern Table Lamp",
    price: 89.99,
    description:
      "Illuminate your space with style. Adjustable brightness and sleek modern design.",
    images: [
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "Home",
    inStock: true,
  },
];

export const useBuilderStore = create((set) => ({
  // Current customization settings
  settings: defaultSettings,

  // Products
  products: sampleProducts,

  // Current page navigation
  currentPage: "home", // 'home', 'product-detail', 'checkout'
  selectedProductId: null,

  // Cart
  cart: [],

  // Update individual setting
  updateSetting: (key, value) =>
    set((state) => ({
      settings: { ...state.settings, [key]: value },
    })),

  // Update multiple settings at once
  updateSettings: (updates) =>
    set((state) => ({
      settings: { ...state.settings, ...updates },
    })),

  // Reset to defaults
  resetSettings: () =>
    set({
      settings: defaultSettings,
    }),

  // Switch template
  switchTemplate: (templateName) =>
    set((state) => ({
      settings: { ...state.settings, template: templateName },
    })),

  // Product management
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: Date.now().toString() }],
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p,
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  // Navigation
  setCurrentPage: (page) =>
    set({
      currentPage: page,
    }),

  setSelectedProduct: (productId) =>
    set({
      selectedProductId: productId,
      currentPage: "product-detail",
    }),

  // Cart management
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () =>
    set({
      cart: [],
    }),
}));
