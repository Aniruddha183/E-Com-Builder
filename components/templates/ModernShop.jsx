import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export default function ModernShop({ settings }) {
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

  const collections = [
    {
      id: 1,
      name: "New Arrivals",
      count: "24 items",
      image:
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    },
    {
      id: 2,
      name: "Trending Now",
      count: "18 items",
      image:
        "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Ceramic Vase",
      price: "$45",
      tag: "New",
      image:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2",
    },
    {
      id: 2,
      name: "Modern Lamp",
      price: "$129",
      tag: "Popular",
      image:
        "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2",
    },
    {
      id: 3,
      name: "Wall Art",
      price: "$89",
      tag: "Sale",
      image:
        "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2",
    },
    {
      id: 4,
      name: "Throw Pillow",
      price: "$35",
      tag: "New",
      image:
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2",
    },
  ];

  return (
    <div
      className={`min-h-screen font-${fontFamily}`}
      style={{ backgroundColor: secondaryColor }}
    >
      {/* Floating Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ backgroundColor: `${secondaryColor}95` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {logo ? (
                <img
                  src={logo}
                  alt={businessName}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <Sparkles size={24} style={{ color: accentColor }} />
              )}
              <span
                className="text-lg font-bold"
                style={{ color: primaryColor }}
              >
                {logoText}
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button
                className="font-medium transition-colors duration-200 hover:opacity-60"
                style={{ color: primaryColor }}
              >
                Shop
              </button>
              <button
                className="font-medium transition-colors duration-200 hover:opacity-60"
                style={{ color: primaryColor }}
              >
                Collections
              </button>
              <button
                className="font-medium transition-colors duration-200 hover:opacity-60"
                style={{ color: primaryColor }}
              >
                About
              </button>
            </nav>

            <button className="transition-all duration-200 hover:scale-110 active:scale-95">
              <ShoppingBag size={20} style={{ color: primaryColor }} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero with Gradient */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColor}20 0%, ${secondaryColor} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              <Sparkles size={14} />
              New Collection Available
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ color: primaryColor }}
            >
              {businessName}
            </h1>
            <p
              className="text-xl md:text-2xl mb-10 opacity-70"
              style={{ color: primaryColor }}
            >
              {businessTagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  backgroundColor: accentColor,
                  color: secondaryColor,
                }}
              >
                Shop Now
              </button>
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 border-2"
                style={{
                  borderColor: primaryColor,
                  color: primaryColor,
                }}
              >
                View Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: primaryColor }}
          >
            Collections
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-video"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8"
                  style={{
                    background: `linear-gradient(to top, ${primaryColor}90 0%, transparent 100%)`,
                  }}
                >
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: secondaryColor }}
                  >
                    {collection.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p
                      className="text-sm opacity-90"
                      style={{ color: secondaryColor }}
                    >
                      {collection.count}
                    </p>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: accentColor }}
                    >
                      <ArrowRight size={18} style={{ color: secondaryColor }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: primaryColor }}>
              Featured Products
            </h2>
            <button
              className="flex items-center gap-2 font-semibold text-sm transition-all duration-200 hover:gap-3"
              style={{ color: accentColor }}
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: accentColor,
                      color: secondaryColor,
                    }}
                  >
                    {product.tag}
                  </div>
                </div>
                <h3
                  className="font-semibold mb-2 group-hover:opacity-70 transition-opacity"
                  style={{ color: primaryColor }}
                >
                  {product.name}
                </h3>
                <p className="font-bold" style={{ color: accentColor }}>
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-20"
        style={{ backgroundColor: `${accentColor}10` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: primaryColor }}
          >
            Stay in the loop
          </h2>
          <p
            className="text-lg mb-8 opacity-70"
            style={{ color: primaryColor }}
          >
            Get the latest updates on new products and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 outline-none transition-all duration-200 focus:scale-105"
              style={{
                borderColor: `${primaryColor}20`,
                backgroundColor: secondaryColor,
                color: primaryColor,
              }}
            />
            <button
              className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                backgroundColor: accentColor,
                color: secondaryColor,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-16 border-t"
        style={{ borderColor: `${primaryColor}10` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {logo ? (
                  <img
                    src={logo}
                    alt={businessName}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <Sparkles size={24} style={{ color: accentColor }} />
                )}
                <span
                  className="text-lg font-bold"
                  style={{ color: primaryColor }}
                >
                  {logoText}
                </span>
              </div>
              <p
                className="text-sm opacity-70 mb-4"
                style={{ color: primaryColor }}
              >
                {businessTagline}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: primaryColor }}>
                Shop
              </h4>
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
                    Collections
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: primaryColor }}>
                Contact
              </h4>
              <p
                className="text-sm opacity-70 mb-2"
                style={{ color: primaryColor }}
              >
                {businessEmail}
              </p>
              <p
                className="text-sm opacity-70 mb-2"
                style={{ color: primaryColor }}
              >
                {businessPhone}
              </p>
              <p className="text-sm opacity-70" style={{ color: primaryColor }}>
                {businessAddress}
              </p>
            </div>
          </div>
          <div
            className="pt-8 border-t text-center text-sm opacity-50"
            style={{ borderColor: `${primaryColor}10`, color: primaryColor }}
          >
            © 2025 {businessName}. Crafted with care.
          </div>
        </div>
      </footer>
    </div>
  );
}
