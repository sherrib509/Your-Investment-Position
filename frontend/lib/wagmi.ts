import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Your Investment Position",
  projectId: "YOUR_PROJECT_ID", // Get from cloud.walletconnect.com
  chains: [sepolia],
  ssr: true,
});

