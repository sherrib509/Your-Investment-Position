export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "externalEuint8", name: "a1", type: "bytes32" },
      { internalType: "externalEuint8", name: "a2", type: "bytes32" },
      { internalType: "externalEuint8", name: "a3", type: "bytes32" },
      { internalType: "externalEuint8", name: "a4", type: "bytes32" },
      { internalType: "externalEuint8", name: "a5", type: "bytes32" },
      { internalType: "externalEuint8", name: "a6", type: "bytes32" },
      { internalType: "externalEuint8", name: "a7", type: "bytes32" },
      { internalType: "externalEuint8", name: "a8", type: "bytes32" },
      { internalType: "bytes", name: "inputProof", type: "bytes" },
    ],
    name: "submitAssessment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "hasCompleted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getResultHandle",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalParticipants",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

