import { Menu, ShoppingCart, Star } from "lucide-react";

export default function BoldCommerce({ settings }) {
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

  const featuredProduct = {
    name: "Premium Headphones",
    price: "$349",
    rating: 4.8,
    reviews: 127,
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
  };

  const products = [
    {
      id: 1,
      name: "Smart Speaker",
      price: "$199",
      image:
        "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    },
    {
      id: 2,
      name: "Fitness Tracker",
      price: "$149",
      image:
        "https://images.pexels.com/photos/437036/pexels-photo-437036.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    },
    {
      id: 3,
      name: "Portable Charger",
      price: "$79",
      image:
        "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
    },
  ];

  return (
    <div
      className={`min-h-screen font-${fontFamily}`}
      style={{ backgroundColor: secondaryColor }}
    >
      {/* Header with Promo Bar */}
      <div
        className="py-2 text-center text-sm font-medium"
        style={{ backgroundColor: accentColor, color: secondaryColor }}
      >
        Free shipping on orders over $50 🎉
      </div>

      <header className="border-b" style={{ borderColor: `${primaryColor}20` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="lg:hidden transition-all duration-200 hover:scale-110 active:scale-95">
              <Menu size={24} style={{ color: primaryColor }} />
            </button>

            <div className="flex items-center gap-3">
              {logo ? (
                <img
                  src={logo}
                  alt={businessName}
                  className="h-12 w-12 object-contain"
                />
              ) : (
                <div
                  className="h-12 w-12 rounded-lg flex items-center justify-center font-bold text-xl"
                  style={{
                    backgroundColor: accentColor,
                    color: secondaryColor,
                  }}
                >
                  {logoText.charAt(0)}
                </div>
              )}
              <span
                className="text-2xl font-bold tracking-tight"
                style={{ color: primaryColor }}
              >
                {logoText}
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <button
                className="font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{ color: accentColor }}
              >
                Shop All
              </button>
              <button
                className="font-medium text-sm transition-colors duration-200 hover:opacity-70"
                style={{ color: primaryColor }}
              >
                New Arrivals
              </button>
              <button
                className="font-medium text-sm transition-colors duration-200 hover:opacity-70"
                style={{ color: primaryColor }}
              >
                Best Sellers
              </button>
              <button
                className="font-medium text-sm transition-colors duration-200 hover:opacity-70"
                style={{ color: primaryColor }}
              >
                Sale
              </button>
            </nav>

            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: accentColor, color: secondaryColor }}
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                style={{ color: primaryColor }}
              >
                {businessName}
              </h1>
              <p
                className="text-xl md:text-2xl mb-8 opacity-80"
                style={{ color: primaryColor }}
              >
                {businessTagline}
              </p>
              <button
                className="px-10 py-4 rounded-full font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: accentColor, color: secondaryColor }}
              >
                Explore Collection
              </button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 p-6 rounded-xl shadow-lg"
                style={{ backgroundColor: secondaryColor }}
              >
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: primaryColor }}
                >
                  {featuredProduct.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.floor(featuredProduct.rating)
                            ? accentColor
                            : "none"
                        }
                        style={{ color: accentColor }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-sm opacity-70"
                    style={{ color: primaryColor }}
                  >
                    ({featuredProduct.reviews})
                  </span>
                </div>
                <p
                  className="font-bold text-2xl"
                  style={{ color: accentColor }}
                >
                  {featuredProduct.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: primaryColor }}
            >
              Best Sellers
            </h2>
            <button
              className="font-semibold text-sm transition-colors duration-200 hover:opacity-70"
              style={{ color: accentColor }}
            >
              View All →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
                style={{
                  borderColor: `${primaryColor}10`,
                  backgroundColor: secondaryColor,
                }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: primaryColor }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p
                      className="font-bold text-xl"
                      style={{ color: accentColor }}
                    >
                      {product.price}
                    </p>
                    <button
                      className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: primaryColor, color: secondaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="font-bold text-xl mb-4">{businessName}</h3>
              <p className="text-sm opacity-80 mb-4 max-w-md">
                {businessTagline}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="opacity-80 hover:opacity-100 transition-opacity">
                    Shop
                  </button>
                </li>
                <li>
                  <button className="opacity-80 hover:opacity-100 transition-opacity">
                    About Us
                  </button>
                </li>
                <li>
                  <button className="opacity-80 hover:opacity-100 transition-opacity">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm opacity-80 mb-2">{businessEmail}</p>
              <p className="text-sm opacity-80 mb-2">{businessPhone}</p>
              <p className="text-sm opacity-80">{businessAddress}</p>
            </div>
          </div>
          <div
            className="pt-8 border-t text-center text-sm opacity-60"
            style={{ borderColor: `${secondaryColor}20` }}
          >
            © 2025 {businessName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
