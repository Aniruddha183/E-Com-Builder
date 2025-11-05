"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { DeployService } from "@/utils/deployService";
import {
  Download,
  Upload,
  Globe,
  X,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

const Stage = ({ id, label, deployProgress }) => {
  const order = [
    "generating",
    "repo",
    "upload",
    "verify",
    "vercel",
    "deploy",
    "complete",
  ];
  const current = order.indexOf(deployProgress?.stage || "");
  const me = order.indexOf(id);

  return (
    <div className="flex items-center gap-3">
      {me < current ? (
        <Check size={16} className="text-green-600" />
      ) : me === current ? (
        <Loader2 size={16} className="text-blue-600 animate-spin" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
      )}
      <span className="text-sm text-gray-800 dark:text-gray-200">{label}</span>
    </div>
  );
};

export default function DeployModal({ isOpen, onClose }) {
  const { settings } = useBuilderStore();
  const [deployMethod, setDeployMethod] = useState("vercel");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState(null);
  const [deployProgress, setDeployProgress] = useState(null);
  const [githubToken, setGithubToken] = useState("");
  const [vercelToken, setVercelToken] = useState("");

  if (!isOpen) return null;

  const storeConfig = {
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
        name: settings.businessName || "My Store",
        tagline: settings.businessTagline || "Modern storefront",
        email: settings.businessEmail || "hello@example.com",
        phone: settings.businessPhone || "+91-0000000000",
        address: settings.businessAddress || "India",
      },
    },
  };

  const handleDownloadStore = async () => {
    try {
      const appStructure = DeployService.generateStoreApp(storeConfig);
      const blob = new Blob([JSON.stringify(appStructure, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${storeConfig.customization.business.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-store.json`;
      a.click();
      URL.revokeObjectURL(url);

      setDeployResult({
        success: true,
        message:
          "Store package downloaded. Extract and run locally or deploy manually.",
      });
    } catch (e) {
      setDeployResult({
        success: false,
        message: `Failed to generate: ${e.message}`,
      });
    }
  };

  const handleDeployToVercel = async () => {
    if (!githubToken)
      return setDeployResult({
        success: false,
        message: "Please enter your GitHub token",
      });
    if (!vercelToken)
      return setDeployResult({
        success: false,
        message: "Please enter your Vercel API token",
      });

    setIsDeploying(true);
    setDeployResult(null);
    setDeployProgress(null);

    const result = await DeployService.deployToVercel(
      storeConfig,
      githubToken,
      vercelToken,
      (progress) => setDeployProgress(progress)
    );

    setIsDeploying(false);
    setDeployProgress(null);
    setDeployResult(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E6E6E6] dark:border-[#333333] max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6E6E6] dark:border-[#333333]">
          <div>
            <h3 className="text-lg font-bold text-black dark:text-white">
              Deploy Your Store
            </h3>
            <p className="text-sm text-[#6E6E6E] dark:text-[#888888]">
              Publish your customized store
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isDeploying}
            className="w-8 h-8 rounded-lg hover:bg-black/5 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeployMethod("download")}
              disabled={isDeploying}
              className={`p-4 rounded-lg border ${
                deployMethod === "download" ? "bg-black text-white" : ""
              }`}
            >
              <Download size={18} className="mb-1" /> Download Package
            </button>
            <button
              onClick={() => setDeployMethod("vercel")}
              disabled={isDeploying}
              className={`p-4 rounded-lg border ${
                deployMethod === "vercel" ? "bg-black text-white" : ""
              }`}
            >
              <Upload size={18} className="mb-1" /> Deploy to Vercel
            </button>
          </div>

          {deployMethod === "download" && (
            <button
              onClick={handleDownloadStore}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black text-white"
            >
              <Download size={16} />
              Download Store Package
            </button>
          )}

          {deployMethod === "vercel" && (
            <>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-semibold">
                    GitHub Personal Access Token
                  </label>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    disabled={isDeploying}
                    className="mt-1 w-full px-3 py-2 rounded-lg border bg-white dark:bg-[#262626]"
                    placeholder="ghp_xxxxxxxxxxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Vercel API Token
                  </label>
                  <input
                    type="password"
                    value={vercelToken}
                    onChange={(e) => setVercelToken(e.target.value)}
                    disabled={isDeploying}
                    className="mt-1 w-full px-3 py-2 rounded-lg border bg-white dark:bg-[#262626]"
                    placeholder="xxxxxxxxxxxxxxxxxxxx"
                  />
                </div>
                <button
                  onClick={handleDeployToVercel}
                  disabled={isDeploying || !githubToken || !vercelToken}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black text-white disabled:opacity-50"
                >
                  {isDeploying ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Globe size={16} />
                  )}
                  {isDeploying ? "Deploying..." : "Deploy to Vercel"}
                </button>
              </div>

              {deployProgress && (
                <div className="rounded-lg border p-4 space-y-2">
                  <div className="font-semibold mb-2">Deployment Progress</div>
                  <Stage
                    id="generating"
                    label="Generating files"
                    deployProgress={deployProgress}
                  />
                  <Stage
                    id="repo"
                    label="Creating GitHub repository"
                    deployProgress={deployProgress}
                  />
                  <Stage
                    id="upload"
                    label={`Uploading files${
                      deployProgress?.progress
                        ? ` (${deployProgress.progress}%)`
                        : ""
                    }`}
                    deployProgress={deployProgress}
                  />
                  <Stage
                    id="verify"
                    label="Verifying upload"
                    deployProgress={deployProgress}
                  />
                  <Stage
                    id="vercel"
                    label="Creating Vercel project"
                    deployProgress={deployProgress}
                  />
                  <Stage
                    id="deploy"
                    label="Triggering deployment"
                    deployProgress={deployProgress}
                  />
                </div>
              )}
            </>
          )}

          {deployResult && (
            <div
              className={`rounded-lg p-4 ${
                deployResult.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {deployResult.success ? (
                  <Check className="text-green-600" />
                ) : (
                  <AlertCircle className="text-red-600" />
                )}
                <div>
                  <div className="font-semibold">
                    {deployResult.success ? "Success!" : "Error"}
                  </div>
                  <div className="text-sm mt-1">{deployResult.message}</div>
                  {deployResult.repoUrl && (
                    <a
                      className="block text-blue-600 mt-2"
                      href={deployResult.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View GitHub repository →
                    </a>
                  )}
                  {deployResult.vercelUrl && (
                    <a
                      className="block text-blue-600 mt-1"
                      href={deployResult.vercelUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit your store →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
