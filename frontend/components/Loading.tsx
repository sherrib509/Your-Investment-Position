"use client";

import { useStore } from "@/store/useStore";

interface LoadingProps {
  type: "submitting" | "decrypting";
}

export function Loading({ type }: LoadingProps) {
  const { txHash } = useStore();

  const content = {
    submitting: {
      title: "Encrypting & Submitting",
      steps: [
        "Encrypting your answers with FHE",
        "Sending encrypted data to blockchain",
        "Waiting for confirmation",
      ],
    },
    decrypting: {
      title: "Decrypting Result",
      steps: [
        "Requesting decryption permission",
        "Processing encrypted computation",
        "Revealing your profile",
      ],
    },
  };

  const { title, steps } = content[type];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 fade-in">
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <div className="w-20 h-20 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent spinner" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">{type === "submitting" ? "🔐" : "🔓"}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h2>

        {/* Steps */}
        <div className="space-y-3 mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-gray-500 justify-center"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <svg className="w-4 h-4 spinner" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>

        {/* Transaction Hash */}
        {txHash && type === "submitting" && (
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-teal-600 hover:text-teal-700"
          >
            <span>View on Etherscan</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {/* Privacy Note */}
        <p className="text-xs text-gray-400 mt-8">
          Your answers remain encrypted throughout the process
        </p>
      </div>
    </div>
  );
}

