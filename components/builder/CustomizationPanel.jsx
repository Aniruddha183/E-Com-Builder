"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { useUpload } from "@/utils/useUpload";
import {
  Palette,
  Type,
  Building2,
  Image as ImageIcon,
  X,
  Check,
  Package,
} from "lucide-react";
import ProductManager from "@/components/builder/ProductManager";

export default function CustomizationPanel() {
  const { settings, updateSetting } = useBuilderStore();
  const [upload, { loading: uploading }] = useUpload();
  const [activeTab, setActiveTab] = useState("branding");

  const tabs = [
    { id: "branding", label: "Branding", icon: ImageIcon },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "products", label: "Products", icon: Package },
    { id: "business", label: "Business Info", icon: Building2 },
  ];

  const fontOptions = [
    { value: "inter", label: "Inter" },
    { value: "plus-jakarta", label: "Plus Jakarta" },
    { value: "sora", label: "Sora" },
    { value: "montserrat", label: "Montserrat" },
    { value: "poppins", label: "Poppins" },
  ];

  const colorPresets = [
    {
      name: "Dark Mode",
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#3B82F6",
    },
    {
      name: "Ocean Blue",
      primary: "#0C4A6E",
      secondary: "#F0F9FF",
      accent: "#0EA5E9",
    },
    {
      name: "Forest Green",
      primary: "#14532D",
      secondary: "#F0FDF4",
      accent: "#22C55E",
    },
    {
      name: "Sunset Orange",
      primary: "#7C2D12",
      secondary: "#FFF7ED",
      accent: "#F97316",
    },
    {
      name: "Royal Purple",
      primary: "#581C87",
      secondary: "#FAF5FF",
      accent: "#A855F7",
    },
  ];

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await upload({ file });
      if (result.url) {
        updateSetting("logo", result.url);
      }
    } catch (error) {
      console.error("Failed to upload logo:", error);
    }
  };

  const applyColorPreset = (preset) => {
    updateSetting("primaryColor", preset.primary);
    updateSetting("secondaryColor", preset.secondary);
    updateSetting("accentColor", preset.accent);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#1E1E1E] border-r border-[#E6E6E6] dark:border-[#333333]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#E6E6E6] dark:border-[#333333]">
        <h2 className="text-lg font-bold text-black dark:text-white font-bricolage">
          Customize Store
        </h2>
        <p className="text-sm text-[#6E6E6E] dark:text-[#888888] mt-1 font-inter">
          Make it your own
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E6E6E6] dark:border-[#333333] px-3 gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 relative whitespace-nowrap ${
                isActive
                  ? "text-black dark:text-white"
                  : "text-[#6E6E6E] dark:text-[#888888] hover:text-black dark:hover:text-white"
              }`}
            >
              <Icon size={16} />
              <span className="hidden lg:inline">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Branding Tab */}
        {activeTab === "branding" && (
          <>
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                Logo
              </label>
              <div className="space-y-3">
                {settings.logo && (
                  <div className="relative group">
                    <img
                      src={settings.logo}
                      alt="Logo"
                      className="w-full h-32 object-contain rounded-lg border border-[#E6E6E6] dark:border-[#333333] bg-[#F9FAFB] dark:bg-[#262626] p-4"
                    />
                    <button
                      onClick={() => updateSetting("logo", null)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <X size={14} className="text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                )}
                <label className="block w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <div className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-[#D0D0D0] dark:border-[#404040] text-center cursor-pointer transition-all duration-200 hover:border-black dark:hover:border-white hover:bg-[#F9FAFB] dark:hover:bg-[#262626]">
                    <ImageIcon
                      size={20}
                      className="mx-auto mb-2 text-[#6E6E6E] dark:text-[#888888]"
                    />
                    <span className="text-sm font-medium text-[#6E6E6E] dark:text-[#888888]">
                      {uploading ? "Uploading..." : "Upload Logo"}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                Logo Text
              </label>
              <input
                type="text"
                value={settings.logoText}
                onChange={(e) => updateSetting("logoText", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm transition-all duration-200 focus:outline-none focus:border-black dark:focus:border-white"
                placeholder="Your Store"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                Business Name
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => updateSetting("businessName", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm transition-all duration-200 focus:outline-none focus:border-black dark:focus:border-white"
                placeholder="Your Store Name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                Tagline
              </label>
              <textarea
                value={settings.businessTagline}
                onChange={(e) =>
                  updateSetting("businessTagline", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm transition-all duration-200 focus:outline-none focus:border-black dark:focus:border-white resize-none"
                placeholder="Beautiful products for modern living"
              />
            </div>
          </>
        )}

        {/* Colors Tab */}
        {activeTab === "colors" && (
          <>
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                Color Presets
              </label>
              <div className="grid grid-cols-1 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyColorPreset(preset)}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#E6E6E6] dark:border-[#333333] hover:border-black dark:hover:border-white transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: preset.secondary }}
                        />
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <span className="text-sm font-medium text-black dark:text-white">
                        {preset.name}
                      </span>
                    </div>
                    {settings.primaryColor === preset.primary &&
                      settings.secondaryColor === preset.secondary &&
                      settings.accentColor === preset.accent && (
                        <Check
                          size={16}
                          className="text-green-600 dark:text-green-400"
                        />
                      )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                  Primary Color
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) =>
                      updateSetting("primaryColor", e.target.value)
                    }
                    className="w-16 h-12 rounded-lg border border-[#E6E6E6] dark:border-[#333333] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) =>
                      updateSetting("primaryColor", e.target.value)
                    }
                    className="flex-1 px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                  Background Color
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) =>
                      updateSetting("secondaryColor", e.target.value)
                    }
                    className="w-16 h-12 rounded-lg border border-[#E6E6E6] dark:border-[#333333] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) =>
                      updateSetting("secondaryColor", e.target.value)
                    }
                    className="flex-1 px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                  Accent Color
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) =>
                      updateSetting("accentColor", e.target.value)
                    }
                    className="w-16 h-12 rounded-lg border border-[#E6E6E6] dark:border-[#333333] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.accentColor}
                    onChange={(e) =>
                      updateSetting("accentColor", e.target.value)
                    }
                    className="flex-1 px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Typography Tab */}
        {activeTab === "typography" && (
          <div>
            <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
              Font Family
            </label>
            <div className="space-y-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  onClick={() => updateSetting("fontFamily", font.value)}
                  className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                    settings.fontFamily === font.value
                      ? "border-black dark:border-white bg-[#F9FAFB] dark:bg-[#262626]"
                      : "border-[#E6E6E6] dark:border-[#333333] hover:border-[#D0D0D0] dark:hover:border-[#404040]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-${font.value}`}>
                      {font.label}
                    </span>
                    {settings.fontFamily === font.value && (
                      <Check
                        size={18}
                        className="text-green-600 dark:text-green-400"
                      />
                    )}
                  </div>
                  <p
                    className={`text-sm text-[#6E6E6E] dark:text-[#888888] mt-2 font-${font.value}`}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && <ProductManager />}

        {/* Business Info Tab */}
        {activeTab === "business" && (
          <>
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                Email Address
              </label>
              <input
                type="email"
                value={settings.businessEmail}
                onChange={(e) => updateSetting("businessEmail", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm transition-all duration-200 focus:outline-none focus:border-black dark:focus:border-white"
                placeholder="hello@yourstore.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.businessPhone}
                onChange={(e) => updateSetting("businessPhone", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm transition-all duration-200 focus:outline-none focus:border-black dark:focus:border-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-3 font-inter">
                Business Address
              </label>
              <textarea
                value={settings.businessAddress}
                onChange={(e) =>
                  updateSetting("businessAddress", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-[#D0D0D0] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white text-sm transition-all duration-200 focus:outline-none focus:border-black dark:focus:border-white resize-none"
                placeholder="123 Main Street, City, State 12345"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
