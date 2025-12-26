# Your Investment Position

An 8-question assessment that reveals your investment decision-making style. Your answers are encrypted in your browser and the score is computed entirely on encrypted data using FHE - no one can see your individual responses, only you can decrypt your final result.

## What It Does

- **Client-Side Encryption**: Answers encrypted in browser before submission
- **Encrypted Computation**: Score calculated on-chain using 7 FHE addition operations
- **Private Decryption**: Only you can decrypt your result via EIP-712 signature
- **Modern Interface**: Clean, responsive UI with real-time status feedback

## Tech Stack

- **Frontend**: Next.js 14, RainbowKit, wagmi, TailwindCSS
- **Smart Contract**: Solidity 0.8.24, FHEVM v0.9
- **FHE SDK**: @zama-fhe/relayer-sdk v0.3.0-5
- **Network**: Sepolia Testnet

## Deployed Contract

**Address**: [`0x4e7b30611C4417ff080738b43f594a917ff798bD`](https://sepolia.etherscan.io/address/0x4e7b30611C4417ff080738b43f594a917ff798bD)

[View on Etherscan](https://sepolia.etherscan.io/address/0x4e7b30611C4417ff080738b43f594a917ff798bD) | Contract verified ✅

## Getting Started

### Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 and connect your wallet.

### Deploy the Contract

```bash
cd contracts
npm install
npm run deploy
```

After deployment, update `frontend/lib/constants.ts` with the new contract address.

### Run Tests

```bash
cd contracts
npm test
```

✅ **All tests passed** (19 passing)

Tests cover FHE operations, state management, access control, and integration readiness.

## How It Works

The assessment evaluates four dimensions of investment decision-making:

1. **Risk Perception** - Identifying potential risks
2. **Uncertainty Tolerance** - Comfort with incomplete information
3. **Decision Execution** - Action-taking and decisiveness
4. **Adaptive Learning** - Learning from past decisions

Each of 8 questions is scored 1-5, totaling 8-40 points. Your score determines your profile:

| Score | Profile |
|-------|---------|
| 33-40 | 🦅 Strategic Decision Maker |
| 25-32 | 🛡️ Steady Executor |
| 17-24 | 🔍 Cautious Observer |
| 8-16  | 🏠 Risk Avoider |

## Project Structure

```
├── frontend/           # Next.js frontend app
│   ├── app/           # App router pages
│   ├── components/    # React components
│   ├── lib/           # FHE, wagmi config
│   └── store/         # Zustand state
├── contracts/         # Hardhat project
│   ├── src/
│   │   └── InvestmentPosition.sol
│   ├── test/
│   │   └── InvestmentPosition.test.ts
│   └── scripts/
│       └── deploy.ts
```

## License

MIT

