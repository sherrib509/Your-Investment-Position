"use client";

import { useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useWalletClient } from "wagmi";
import { useStore } from "@/store/useStore";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import { CONTRACT_ABI } from "@/lib/contract";
import { Loading } from "./Loading";

let isDecryptionStarted = false;
let isSubmissionStarted = false;

export function SubmitHandler() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const {
    appState,
    answers,
    setAppState,
    setTxHash,
    setResultScore,
    setIsFheResult,
    setIsSubmitting,
    setIsDecrypting,
    clearAnswers,
  } = useStore();

  const { writeContract, data: hash, error: writeError } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (appState === "welcome" || appState === "assessment") {
      isSubmissionStarted = false;
      isDecryptionStarted = false;
    }
  }, [appState]);
  useEffect(() => {
    if (appState !== "submitting" || !address || isSubmissionStarted) return;
    isSubmissionStarted = true;

    const submit = async () => {
      try {
        setIsSubmitting(true);
        const { encryptAnswers } = await import("@/lib/fhe");
        const encrypted = await encryptAnswers(CONTRACT_ADDRESS, address, answers);
        
        // Clear plaintext answers immediately after encryption
        clearAnswers();
        
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "submitAssessment",
          args: [
            encrypted.handles[0],
            encrypted.handles[1],
            encrypted.handles[2],
            encrypted.handles[3],
            encrypted.handles[4],
            encrypted.handles[5],
            encrypted.handles[6],
            encrypted.handles[7],
            encrypted.inputProof,
          ],
          gas: 2000000n,
        });
      } catch (error) {
        setAppState("assessment");
        setIsSubmitting(false);
        isSubmissionStarted = false;
      }
    };

    submit();
  }, [appState, address]);

  useEffect(() => {
    if (hash) {
      setTxHash(hash);
    }
  }, [hash]);
  useEffect(() => {
    if (isSuccess && appState === "submitting") {
      setIsSubmitting(false);
      setAppState("decrypting");
    }
  }, [isSuccess, appState]);

  useEffect(() => {
    if (appState !== "decrypting" || !address || !walletClient) return;
    if (isDecryptionStarted) return;
    
    isDecryptionStarted = true;

    const decrypt = async () => {
      try {
        setIsDecrypting(true);
        const { readContract } = await import("wagmi/actions");
        const { config } = await import("@/lib/wagmi");

        const resultHandle = await readContract(config, {
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "getResultHandle",
          args: [address],
        });

        if (!resultHandle || resultHandle === "0x0000000000000000000000000000000000000000000000000000000000000000") {
          throw new Error("No result found");
        }

        const { userDecrypt } = await import("@/lib/fhe");
        const decryptedValue = await userDecrypt(
          resultHandle as string,
          CONTRACT_ADDRESS,
          walletClient
        );

        setResultScore(Number(decryptedValue));
        setIsFheResult(true);
        setAppState("result");
      } catch (error) {
        // Fallback: Only use local calculation if answers still exist in memory
        // This should rarely happen as answers are cleared after encryption
        const hasAnswers = answers.some(a => a > 0);
        
        if (hasAnswers) {
          const localScore = answers.reduce((sum, a) => sum + a, 0);
          setResultScore(localScore);
          setIsFheResult(false);
          clearAnswers();
        } else {
          // No answers available - show error state instead of placeholder
          setAppState("assessment");
          setIsDecrypting(false);
          isDecryptionStarted = false;
          return;
        }
        setAppState("result");
      } finally {
        setIsDecrypting(false);
      }
    };

    decrypt();
  }, [appState, address, walletClient]);

  useEffect(() => {
    if (writeError) {
      if (writeError.message?.includes("Already completed")) {
        setAppState("decrypting");
      } else {
        setAppState("assessment");
      }
      setIsSubmitting(false);
      isSubmissionStarted = false;
    }
  }, [writeError]);

  if (appState === "submitting") {
    return <Loading type="submitting" />;
  }

  if (appState === "decrypting") {
    return <Loading type="decrypting" />;
  }

  return null;
}

