"use client";

import { useState } from "react";
import { Github, Link } from "lucide-react";

export default function GithubOAuth({ onTokenReceived }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectResult, setConnectResult] = useState(null);

  const handleConnectGithub = async () => {
    setIsConnecting(true);
    setConnectResult(null);

    try {
      // In a real implementation, this would open a GitHub OAuth flow
      // For now, we'll show instructions to create a token manually
      setConnectResult({
        success: true,
        message: "Please create a GitHub token manually:",
        instructions: [
          "1. Go to https://github.com/settings/tokens",
          "2. Click 'Generate new token' → 'Fine-grained tokens'",
          "3. Give it a name (e.g., 'Store Builder')",
          "4. Set expiration (recommended: 30 days)",
          "5. Under 'Repository permissions', select 'Contents' → 'Read and write'",
          "6. Under 'Repository permissions', select 'Administration' → 'Read and write'",
          "7. Click 'Generate token'",
          "8. Copy the token and paste it in the GitHub Token field",
        ],
      });
    } catch (error) {
      setConnectResult({
        success: false,
        message: "Failed to connect to GitHub: " + error.message,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] dark:bg-[#0A0A0A] rounded-lg p-4 border border-[#E6E6E6] dark:border-[#333333]">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-bold text-black dark:text-white font-inter flex items-center gap-2">
          <Github size={20} />
          Connect GitHub Account
        </h5>
        <button
          onClick={handleConnectGithub}
          disabled={isConnecting}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {isConnecting ? (
            <>
              <div className="w-3 h-3 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
              Connecting...
            </>
          ) : (
            <>
              <Link size={16} />
              Connect
            </>
          )}
        </button>
      </div>

      {connectResult && (
        <div
          className={`rounded-lg p-3 text-sm ${
            connectResult.success
              ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <p
            className={`font-medium mb-2 ${
              connectResult.success
                ? "text-blue-800 dark:text-blue-200"
                : "text-red-800 dark:text-red-200"
            }`}
          >
            {connectResult.message}
          </p>

          {connectResult.instructions && (
            <ul className="space-y-1">
              {connectResult.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="text-blue-700 dark:text-blue-300 flex items-start gap-2"
                >
                  <span className="flex-shrink-0 mt-1">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="text-xs text-[#6E6E6E] dark:text-[#888888] mt-3">
        We need GitHub access to create a repository and upload your store
        files.
      </p>
    </div>
  );
}
