"use client";

import { useBuilderStore } from "@/store/builderStore";
import { Check } from "lucide-react";

export default function TemplateSelector({ onClose }) {
  const { settings, switchTemplate } = useBuilderStore();

  const templates = [
    {
      id: "minimal",
      name: "Minimal Store",
      description: "Clean and simple design perfect for showcasing products",
      preview:
        "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
      tags: ["Minimal", "Clean", "Modern"],
    },
    {
      id: "bold",
      name: "Bold Commerce",
      description:
        "Eye-catching design with vibrant colors and bold typography",
      preview:
        "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
      tags: ["Bold", "Vibrant", "Energetic"],
    },
    {
      id: "modern",
      name: "Modern Shop",
      description: "Contemporary design with smooth animations and gradients",
      preview:
        "https://images.pexels.com/photos/7679869/pexels-photo-7679869.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
      tags: ["Modern", "Sleek", "Trendy"],
    },
  ];

  const handleSelectTemplate = (templateId) => {
    switchTemplate(templateId);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E6E6E6] dark:border-[#333333] p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-bricolage">
          Choose a Template
        </h3>
        <p className="text-sm text-[#6E6E6E] dark:text-[#888888] font-inter">
          Select a template to start customizing your store
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isSelected = settings.template === template.id;

          return (
            <button
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`group text-left rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                isSelected
                  ? "border-black dark:border-white shadow-lg scale-105"
                  : "border-[#E6E6E6] dark:border-[#333333] hover:border-[#D0D0D0] dark:hover:border-[#404040] hover:shadow-md"
              }`}
            >
              {/* Preview Image */}
              <div className="relative aspect-video overflow-hidden bg-[#F9FAFB] dark:bg-[#262626]">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {isSelected && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                    <Check size={16} className="text-white dark:text-black" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <h4 className="text-base font-bold text-black dark:text-white mb-2 font-bricolage">
                  {template.name}
                </h4>
                <p className="text-sm text-[#6E6E6E] dark:text-[#888888] mb-3 font-inter">
                  {template.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-[#F3F3F3] dark:bg-[#2A2A2A] text-[#4D4D4D] dark:text-[#B0B0B0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
