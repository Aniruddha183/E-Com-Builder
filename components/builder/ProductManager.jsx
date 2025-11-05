"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { useUpload } from "@/utils/useUpload";
import { Image as ImageIcon, X, Plus, Trash2, Edit } from "lucide-react";

export default function ProductManager() {
  const { products, addProduct, updateProduct, deleteProduct } =
    useBuilderStore();
  const [upload, { loading: uploading }] = useUpload();
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
    category: "",
    inStock: true,
  });

  const handleProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await upload({ file });
      if (result.url) {
        setProductForm((prev) => ({
          ...prev,
          images: [...prev.images, result.url],
        }));
      }
    } catch (error) {
      console.error("Failed to upload product image:", error);
    }
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price) {
      alert("Please fill in product name and price");
      return;
    }

    const productData = {
      ...productForm,
      price: parseFloat(productForm.price),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
    }

    // Reset form
    setProductForm({
      name: "",
      price: "",
      description: "",
      images: [],
      category: "",
      inStock: true,
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      images: product.images,
      category: product.category,
      inStock: product.inStock,
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      price: "",
      description: "",
      images: [],
      category: "",
      inStock: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Product Form */}
      <div className="space-y-4 p-4 bg-[#F9FAFB] dark:bg-[#0A0A0A] rounded-lg border border-[#E6E6E6] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-black dark:text-white font-inter">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h3>
          {editingProduct && (
            <button
              onClick={handleCancelEdit}
              className="text-xs text-[#6E6E6E] dark:text-[#888888] hover:text-black dark:hover:text-white"
            >
              Cancel
            </button>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-black dark:text-white mb-2 font-inter">
            Product Name *
          </label>
          <input
            type="text"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm focus:outline-none focus:border-black dark:focus:border-white"
            placeholder="Premium Headphones"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-black dark:text-white mb-2 font-inter">
              Price *
            </label>
            <input
              type="number"
              step="0.01"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm focus:outline-none focus:border-black dark:focus:border-white"
              placeholder="99.99"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-black dark:text-white mb-2 font-inter">
              Category
            </label>
            <input
              type="text"
              value={productForm.category}
              onChange={(e) =>
                setProductForm({ ...productForm, category: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm focus:outline-none focus:border-black dark:focus:border-white"
              placeholder="Electronics"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-black dark:text-white mb-2 font-inter">
            Description
          </label>
          <textarea
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm resize-none focus:outline-none focus:border-black dark:focus:border-white"
            placeholder="Product description..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-black dark:text-white mb-2 font-inter">
            Product Images
          </label>
          <div className="space-y-2">
            {productForm.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {productForm.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-20 object-cover rounded border border-[#E6E6E6] dark:border-[#333333]"
                    />
                    <button
                      onClick={() =>
                        setProductForm((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleProductImageUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-[#D0D0D0] dark:border-[#404040] text-center cursor-pointer hover:border-black dark:hover:border-white transition-all">
                <ImageIcon
                  size={16}
                  className="mx-auto mb-1 text-[#6E6E6E] dark:text-[#888888]"
                />
                <span className="text-xs text-[#6E6E6E] dark:text-[#888888]">
                  {uploading ? "Uploading..." : "Add Image"}
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="inStock"
            checked={productForm.inStock}
            onChange={(e) =>
              setProductForm({ ...productForm, inStock: e.target.checked })
            }
            className="w-4 h-4"
          />
          <label
            htmlFor="inStock"
            className="text-sm text-black dark:text-white font-inter"
          >
            In Stock
          </label>
        </div>

        <button
          onClick={handleSaveProduct}
          className="w-full px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={16} className="inline mr-2" />
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Products List */}
      <div>
        <h3 className="text-sm font-bold text-black dark:text-white mb-3 font-inter">
          Products ({products.length})
        </h3>
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-3 rounded-lg border border-[#E6E6E6] dark:border-[#333333] hover:border-black dark:hover:border-white transition-all"
            >
              <div className="flex gap-3">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-black dark:text-white truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#6E6E6E] dark:text-[#888888]">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.category && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-[#F3F3F3] dark:bg-[#2A2A2A] text-[#4D4D4D] dark:text-[#B0B0B0]">
                      {product.category}
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="w-8 h-8 rounded flex items-center justify-center hover:bg-[#F3F3F3] dark:hover:bg-[#2A2A2A] transition-all"
                  >
                    <Edit
                      size={14}
                      className="text-[#6E6E6E] dark:text-[#888888]"
                    />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this product?")) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="w-8 h-8 rounded flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <Trash2
                      size={14}
                      className="text-red-600 dark:text-red-400"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
