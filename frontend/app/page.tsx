"use client";

import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { useStore } from "@/store/useStore";
import { initFhevm, isFhevmReady, resetFhevm } from "@/lib/fhe";
import { Header } from "@/components/Header";
import { Welcome } from "@/components/Welcome";
import { Assessment } from "@/components/Assessment";
import { Result } from "@/components/Result";
import { SubmitHandler } from "@/components/SubmitHandler";

export default function Home() {
  const { isConnected } = useAccount();
  const { appState, setAppState, setFhevmStatus, setFhevmError, reset } = useStore();
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const init = async () => {
      if (isFhevmReady()) {
        setFhevmStatus("ready");
        return;
      }

      setFhevmStatus("initializing");
      try {
        await initFhevm();
        setFhevmStatus("ready");
      } catch (error) {
        setFhevmStatus("error");
        setFhevmError(error instanceof Error ? error.message : "Failed to initialize FHEVM");
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!isConnected) {
      reset();
      resetFhevm();
      initRef.current = false;
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected && appState === "welcome") {
      setAppState("assessment");
    }
  }, [isConnected, appState]);

  return (
    <main className="relative">
      <Header />

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/50 to-white" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      {!isConnected && <Welcome />}
      {isConnected && appState === "assessment" && <Assessment />}
      {isConnected && (appState === "submitting" || appState === "decrypting") && (
        <SubmitHandler />
      )}
      {isConnected && appState === "result" && <Result />}
    </main>
  );
}

