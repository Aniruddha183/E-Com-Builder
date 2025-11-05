"use client";

import { useBuilderStore } from "@/store/builderStore";
import MinimalStore from "@/components/templates/MinimalStore";
import BoldCommerce from "@/components/templates/BoldCommerce";
import ModernShop from "@/components/templates/ModernShop";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

export default function LivePreview() {
  const { settings } = useBuilderStore();
  const [viewMode, setViewMode] = useState("desktop");

  const templates = {
    minimal: MinimalStore,
    bold: BoldCommerce,
    modern: ModernShop,
  };

  const TemplateComponent = templates[settings.template] || MinimalStore;

  const viewModes = [
    { id: "desktop", icon: Monitor, width: "100%" },
    { id: "tablet", icon: Tablet, width: "768px" },
    { id: "mobile", icon: Smartphone, width: "375px" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      {/* Preview Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#1E1E1E] border-b border-[#E6E6E6] dark:border-[#333333]">
        <h3 className="text-sm font-semibold text-black dark:text-white font-inter">
          Live Preview
        </h3>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#F3F3F3] dark:bg-[#0A0A0A] rounded-lg p-1">
          {viewModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`px-3 py-2 rounded-md transition-all duration-200 ${
                  viewMode === mode.id
                    ? "bg-white dark:bg-[#1E1E1E] text-black dark:text-white shadow-sm"
                    : "text-[#6E6E6E] dark:text-[#888888] hover:text-black dark:hover:text-white"
                }`}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <div
          className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            width: viewModes.find((m) => m.id === viewMode)?.width || "100%",
            maxWidth: "100%",
            height: "fit-content",
            minHeight: viewMode === "desktop" ? "100%" : "auto",
          }}
        >
          <div className="w-full h-full overflow-auto">
            <TemplateComponent settings={settings} />
          </div>
        </div>
      </div>
    </div>
  );
}
