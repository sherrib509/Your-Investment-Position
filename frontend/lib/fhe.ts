"use client";

import { initSDK, createInstance, SepoliaConfig } from "@zama-fhe/relayer-sdk/web";

let instance: any = null;
let isInitialized = false;
let isInitializing = false;
let initError: string | null = null;

function toHex(arr: Uint8Array): `0x${string}` {
  return `0x${Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")}`;
}

export async function initFhevm(): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("FHEVM can only be initialized in browser");
  }

  if (instance && isInitialized) return instance;
  if (initError) throw new Error(initError);

  if (isInitializing) {
    return new Promise((resolve, reject) => {
      const check = setInterval(() => {
        if (isInitialized && instance) {
          clearInterval(check);
          resolve(instance);
        }
        if (initError) {
          clearInterval(check);
          reject(new Error(initError));
        }
      }, 100);
    });
  }

  isInitializing = true;

  try {
    await initSDK({ thread: 0 });
    instance = await createInstance(SepoliaConfig);
    isInitialized = true;
    return instance;
  } catch (error: any) {
    initError = error.message || "Failed to initialize FHEVM";
    throw error;
  } finally {
    isInitializing = false;
  }
}

export async function encryptAnswers(
  contractAddress: string,
  userAddress: string,
  answers: number[]
): Promise<{ handles: `0x${string}`[]; inputProof: `0x${string}` }> {
  const fhevm = await initFhevm();
  const input = fhevm.createEncryptedInput(contractAddress, userAddress);

  for (const answer of answers) {
    input.add8(BigInt(answer));
  }

  const encrypted = await input.encrypt();

  return {
    handles: encrypted.handles.map((h: Uint8Array) => toHex(h)),
    inputProof: toHex(encrypted.inputProof),
  };
}

export async function userDecrypt(
  handle: string,
  contractAddress: string,
  signer: any
): Promise<bigint> {
  const fhevm = await initFhevm();

  const userAddress =
    typeof signer.getAddress === "function"
      ? await signer.getAddress()
      : signer.account?.address;

  if (!userAddress) {
    throw new Error("Cannot get user address from signer");
  }

  const { publicKey, privateKey } = fhevm.generateKeypair();
  const eip712 = fhevm.createEIP712(publicKey, [contractAddress]);
  const startTimestamp = eip712.message.startTimestamp ?? Math.floor(Date.now() / 1000);
  const durationDays = eip712.message.durationDays ?? 1;

  const message = {
    ...eip712.message,
    startTimestamp: BigInt(startTimestamp),
    durationDays: BigInt(durationDays),
  };

  const signature = await signer.signTypedData({
    domain: eip712.domain,
    types: eip712.types,
    primaryType: eip712.primaryType,
    message: message,
  });

  const publicKeyStr = publicKey instanceof Uint8Array ? toHex(publicKey) : publicKey;
  const privateKeyStr = privateKey instanceof Uint8Array ? toHex(privateKey) : privateKey;
  const handleContractPairs = [{ handle, contractAddress }];

  const results = await fhevm.userDecrypt(
    handleContractPairs,
    privateKeyStr,
    publicKeyStr,
    signature,
    [contractAddress],
    userAddress,
    String(startTimestamp),
    String(durationDays)
  );

  const decryptedValue = results[handle];

  if (decryptedValue === undefined) {
    throw new Error("No decrypted value found for handle");
  }

  return BigInt(decryptedValue);
}

export function isFhevmReady(): boolean {
  return isInitialized && instance !== null;
}

export function getFhevmError(): string | null {
  return initError;
}

export function resetFhevm(): void {
  instance = null;
  isInitialized = false;
  isInitializing = false;
  initError = null;
}

