"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useStore } from "@/store/useStore";
import { CONTRACT_ADDRESS } from "@/lib/constants";

function StatusDot({ status }: { status: "ready" | "error" | "loading" }) {
  const colors = {
    ready: "bg-emerald-500",
    error: "bg-red-500",
    loading: "bg-amber-500",
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${colors[status]} ${
        status === "loading" ? "pulse-dot" : ""
      }`}
    />
  );
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function Header() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { fhevmStatus, reset } = useStore();

  const handleDisconnect = () => {
    disconnect();
    reset();
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const fheStatusDisplay = () => {
    switch (fhevmStatus) {
      case "ready":
        return { status: "ready" as const, text: "FHE Ready" };
      case "error":
        return { status: "error" as const, text: "FHE Error" };
      case "initializing":
        return { status: "loading" as const, text: "FHE Loading" };
      default:
        return { status: "loading" as const, text: "FHE Pending" };
    }
  };

  const { status, text } = fheStatusDisplay();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">IP</span>
          </div>
          <span className="font-semibold text-gray-900 hidden sm:block">
            Investment Position
          </span>
        </div>

        {/* Status Bar */}
        {isConnected && (
          <div className="flex items-center gap-4">
            {/* FHE Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
              <StatusDot status={status} />
              <span className="text-xs text-gray-600">{text}</span>
            </div>

            {/* Contract Address */}
            <a
              href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-teal-600 transition-colors px-3 py-1.5 bg-gray-50 rounded-full"
            >
              📄 {shortenAddress(CONTRACT_ADDRESS)}
            </a>

            {/* Wallet Address */}
            <button
              onClick={copyAddress}
              className="text-xs text-gray-500 hover:text-teal-600 transition-colors px-3 py-1.5 bg-gray-50 rounded-full"
              title="Click to copy"
            >
              👤 {shortenAddress(address!)}
            </button>

            {/* Disconnect Button */}
            <button
              onClick={handleDisconnect}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors px-3 py-1.5 hover:bg-red-50 rounded-full"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

