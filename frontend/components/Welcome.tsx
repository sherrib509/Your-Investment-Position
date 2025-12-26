"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useStore } from "@/store/useStore";

export function Welcome() {
  const { fhevmStatus } = useStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 fade-in">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          YOUR INVESTMENT
          <br />
          <span className="text-teal-600">POSITION</span>
        </h1>

        <p className="text-lg text-gray-500 mb-12 max-w-md mx-auto">
          Discover your decision-making profile through encrypted assessment
        </p>

        {/* Connect Button */}
        <div className="flex flex-col items-center gap-4">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {!connected && (
                    <button
                      onClick={openConnectModal}
                      className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>

          {/* FHE Status Indicator */}
          {fhevmStatus === "initializing" && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4 spinner"
                fill="none"
                viewBox="0 0 24 24"
              >
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
              Initializing encryption...
            </div>
          )}

          {fhevmStatus === "error" && (
            <div className="text-sm text-red-500">
              Encryption initialization failed
            </div>
          )}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-50" />
    </div>
  );
}

