"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { Download, Code, X, Copy, Check } from "lucide-react";

export default function ExportModal({ isOpen, onClose }) {
  const { settings } = useBuilderStore();
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState("json");

  if (!isOpen) return null;

  const exportData = {
    template: settings.template,
    customization: {
      logo: settings.logo,
      logoText: settings.logoText,
      colors: {
        primary: settings.primaryColor,
        secondary: settings.secondaryColor,
        accent: settings.accentColor,
      },
      typography: {
        fontFamily: settings.fontFamily,
      },
      business: {
        name: settings.businessName,
        tagline: settings.businessTagline,
        email: settings.businessEmail,
        phone: settings.businessPhone,
        address: settings.businessAddress,
      },
    },
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `store-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E6E6E6] dark:border-[#333333] max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6E6E6] dark:border-[#333333]">
          <div>
            <h3 className="text-lg font-bold text-black dark:text-white font-bricolage">
              Export Store Configuration
            </h3>
            <p className="text-sm text-[#6E6E6E] dark:text-[#888888] mt-1 font-inter">
              Download or copy your customization settings
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F3F3F3] dark:hover:bg-[#2A2A2A] active:scale-95"
          >
            <X size={18} className="text-[#6E6E6E] dark:text-[#888888]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Format Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setExportFormat("json")}
              className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 font-medium text-sm ${
                exportFormat === "json"
                  ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                  : "border-[#E6E6E6] dark:border-[#333333] text-black dark:text-white hover:border-[#D0D0D0] dark:hover:border-[#404040]"
              }`}
            >
              <Code size={16} className="inline mr-2" />
              JSON Format
            </button>
            <button
              onClick={() => setExportFormat("summary")}
              className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 font-medium text-sm ${
                exportFormat === "summary"
                  ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                  : "border-[#E6E6E6] dark:border-[#333333] text-black dark:text-white hover:border-[#D0D0D0] dark:hover:border-[#404040]"
              }`}
            >
              Summary
            </button>
          </div>

          {/* Export Content */}
          <div className="bg-[#F9FAFB] dark:bg-[#0A0A0A] rounded-lg p-4 max-h-96 overflow-auto border border-[#E6E6E6] dark:border-[#333333]">
            {exportFormat === "json" ? (
              <pre className="text-xs font-mono text-black dark:text-white whitespace-pre-wrap break-words">
                {JSON.stringify(exportData, null, 2)}
              </pre>
            ) : (
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-black dark:text-white mb-2 font-inter">
                    Template
                  </h4>
                  <p className="text-[#6E6E6E] dark:text-[#888888] capitalize">
                    {settings.template} Store
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white mb-2 font-inter">
                    Branding
                  </h4>
                  <p className="text-[#6E6E6E] dark:text-[#888888]">
                    Logo Text: {settings.logoText}
                  </p>
                  <p className="text-[#6E6E6E] dark:text-[#888888]">
                    Business Name: {settings.businessName}
                  </p>
                  <p className="text-[#6E6E6E] dark:text-[#888888]">
                    Tagline: {settings.businessTagline}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white mb-2 font-inter">
                    Colors
                  </h4>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded border border-[#E6E6E6] dark:border-[#333333]"
                        style={{ backgroundColor: settings.primaryColor }}
                      />
                      <span className="text-[#6E6E6E] dark:text-[#888888] text-xs">
                        Primary
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded border border-[#E6E6E6] dark:border-[#333333]"
                        style={{ backgroundColor: settings.secondaryColor }}
                      />
                      <span className="text-[#6E6E6E] dark:text-[#888888] text-xs">
                        Background
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded border border-[#E6E6E6] dark:border-[#333333]"
                        style={{ backgroundColor: settings.accentColor }}
                      />
                      <span className="text-[#6E6E6E] dark:text-[#888888] text-xs">
                        Accent
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white mb-2 font-inter">
                    Typography
                  </h4>
                  <p className="text-[#6E6E6E] dark:text-[#888888] capitalize">
                    Font: {settings.fontFamily.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white mb-2 font-inter">
                    Contact
                  </h4>
                  <p className="text-[#6E6E6E] dark:text-[#888888]">
                    {settings.businessEmail}
                  </p>
                  <p className="text-[#6E6E6E] dark:text-[#888888]">
                    {settings.businessPhone}
                  </p>
                  <p className="text-[#6E6E6E] dark:text-[#888888]">
                    {settings.businessAddress}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={exportFormat === "json" ? handleCopyJSON : undefined}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#E6E6E6] dark:border-[#333333] text-black dark:text-white font-semibold text-sm transition-all duration-200 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] active:scale-95"
              disabled={exportFormat !== "json"}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy JSON
                </>
              )}
            </button>
            <button
              onClick={handleDownloadJSON}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Download size={16} />
              Download
            </button>
          </div>

          <p className="text-xs text-[#6E6E6E] dark:text-[#888888] text-center font-inter">
            Note: This is a preview prototype. Backend integration coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
