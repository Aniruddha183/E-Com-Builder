import { ShoppingBag, Search, User, Heart } from "lucide-react";

export default function MinimalStore({ settings }) {
  const {
    logo,
    logoText,
    primaryColor,
    secondaryColor,
    accentColor,
    fontFamily,
    businessName,
    businessTagline,
    businessEmail,
    businessPhone,
    businessAddress,
  } = settings;

  // Sample products for demo
  const products = [
    {
      id: 1,
      name: "Minimalist Watch",
      price: "$299",
      image:
        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    },
    {
      id: 2,
      name: "Leather Wallet",
      price: "$89",
      image:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: "$159",
      image:
        "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    },
    {
      id: 4,
      name: "Sunglasses",
      price: "$129",
      image:
        "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    },
  ];

  return (
    <div
      className={`min-h-screen font-${fontFamily}`}
      style={{ backgroundColor: secondaryColor, color: primaryColor }}
    >
      {/* Header */}
      <header className="border-b" style={{ borderColor: `${primaryColor}15` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {logo ? (
                <img
                  src={logo}
                  alt={businessName}
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <ShoppingBag size={32} style={{ color: accentColor }} />
              )}
              <span
                className="text-xl font-bold"
                style={{ color: primaryColor }}
              >
                {logoText}
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: primaryColor }}
              >
                Shop
              </button>
              <button
                className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: primaryColor }}
              >
                Collections
              </button>
              <button
                className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: primaryColor }}
              >
                About
              </button>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="transition-all duration-200 hover:scale-110 active:scale-95">
                <Search size={20} style={{ color: primaryColor }} />
              </button>
              <button className="transition-all duration-200 hover:scale-110 active:scale-95">
                <Heart size={20} style={{ color: primaryColor }} />
              </button>
              <button className="transition-all duration-200 hover:scale-110 active:scale-95">
                <User size={20} style={{ color: primaryColor }} />
              </button>
              <button className="transition-all duration-200 hover:scale-110 active:scale-95">
                <ShoppingBag size={20} style={{ color: primaryColor }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            style={{ color: primaryColor }}
          >
            {businessName}
          </h1>
          <p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-70"
            style={{ color: primaryColor }}
          >
            {businessTagline}
          </p>
          <button
            className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: accentColor,
              color: secondaryColor,
            }}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ color: primaryColor }}
          >
            Featured Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3
                  className="font-semibold text-sm mb-1"
                  style={{ color: primaryColor }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: accentColor }}
                >
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="mt-16 border-t"
        style={{ borderColor: `${primaryColor}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4" style={{ color: primaryColor }}>
                Contact
              </h3>
              <p
                className="text-sm mb-2 opacity-70"
                style={{ color: primaryColor }}
              >
                {businessEmail}
              </p>
              <p
                className="text-sm mb-2 opacity-70"
                style={{ color: primaryColor }}
              >
                {businessPhone}
              </p>
              <p className="text-sm opacity-70" style={{ color: primaryColor }}>
                {businessAddress}
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{ color: primaryColor }}>
                Shop
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: primaryColor }}
                  >
                    All Products
                  </button>
                </li>
                <li>
                  <button
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: primaryColor }}
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: primaryColor }}
                  >
                    Sale
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{ color: primaryColor }}>
                About
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: primaryColor }}
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <button
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: primaryColor }}
                  >
                    Shipping
                  </button>
                </li>
                <li>
                  <button
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: primaryColor }}
                  >
                    Returns
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="mt-12 pt-8 border-t text-center"
            style={{ borderColor: `${primaryColor}15` }}
          >
            <p className="text-sm opacity-50" style={{ color: primaryColor }}>
              © 2025 {businessName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
