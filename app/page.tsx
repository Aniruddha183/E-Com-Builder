"use client";

import { useState } from "react";
import CustomizationPanel from "@/components/builder/CustomizationPanel";
import LivePreview from "@/components/builder/LivePreview";
import TemplateSelector from "@/components/builder/TemplateSelector";
import ExportModal from "@/components/builder/ExportModal";
import DeployModal from "@/components/builder/DeployModal";
import { useBuilderStore } from "@/store/builderStore";
import {
  Layout,
  Download,
  Rocket,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function BuilderPage() {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const { resetSettings } = useBuilderStore();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all customizations?")) {
      resetSettings();
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      {/* Top Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-16 bg-white dark:bg-[#1E1E1E] border-b border-[#E6E6E6] dark:border-[#333333] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <Layout size={20} className="text-white dark:text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-black dark:text-white font-bricolage">
                Store Builder
              </h1>
              <p className="text-xs text-[#6E6E6E] dark:text-[#888888] font-inter">
                Create your perfect store
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTemplateSelector(true)}
            className="px-4 py-2 rounded-lg border border-[#E6E6E6] dark:border-[#333333] text-black dark:text-white font-semibold text-sm transition-all duration-200 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] active:scale-95 font-inter"
          >
            Change Template
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg border border-[#E6E6E6] dark:border-[#333333] text-black dark:text-white font-semibold text-sm transition-all duration-200 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] active:scale-95 font-inter"
          >
            <RotateCcw size={16} className="inline mr-2" />
            Reset
          </button>
          <button
            onClick={() => setShowDeployModal(true)}
            className="px-4 py-2 rounded-lg border border-[#E6E6E6] dark:border-[#333333] text-black dark:text-white font-semibold text-sm transition-all duration-200 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] active:scale-95 font-inter flex items-center"
          >
            <Rocket size={16} className="inline mr-2" />
            Publish
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-6 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 font-inter"
          >
            <Download size={16} className="inline mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex w-full pt-16">
        {/* Customization Panel */}
        <div
          className={`transition-all duration-300 ${
            isPanelCollapsed ? "w-0" : "w-80 lg:w-96"
          } flex-shrink-0 relative`}
        >
          {!isPanelCollapsed && <CustomizationPanel />}

          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
            className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-12 bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] rounded-r-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] z-10 shadow-lg"
          >
            {isPanelCollapsed ? (
              <ChevronRight size={14} className="text-black dark:text-white" />
            ) : (
              <ChevronLeft size={14} className="text-black dark:text-white" />
            )}
          </button>
        </div>

        {/* Live Preview */}
        <div className="flex-1 min-w-0">
          <LivePreview />
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-6xl w-full">
            <TemplateSelector onClose={() => setShowTemplateSelector(false)} />
          </div>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      {/* Deploy Modal */}
      <DeployModal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
      />
    </div>
  );
}