import { ethers, run } from "hardhat";

async function main() {
  console.log("Deploying InvestmentPosition contract...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy contract with explicit gas settings
  console.log("Creating contract factory...");
  const InvestmentPosition = await ethers.getContractFactory("InvestmentPosition");
  
  console.log("Sending deployment transaction...");
  const contract = await InvestmentPosition.deploy({
    gasLimit: 5000000,
  });

  console.log("Deployment tx hash:", contract.deploymentTransaction()?.hash);
  console.log("Waiting for deployment...");
  
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("InvestmentPosition deployed to:", address);

  // Wait for 3 confirmations for verification
  console.log("Waiting for 3 confirmations...");
  await contract.deploymentTransaction()?.wait(3);

  // Verify on Etherscan
  console.log("Verifying on Etherscan...");
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
    console.log("Contract verified!");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("Contract already verified");
    } else {
      console.error("Verification error:", error.message);
    }
  }

  console.log("\n========================================");
  console.log("Deployment complete!");
  console.log("Contract Address:", address);
  console.log("Etherscan:", `https://sepolia.etherscan.io/address/${address}`);
  console.log("========================================");

  // Output for frontend
  console.log("\nUpdate frontend/lib/constants.ts with:");
  console.log(`export const CONTRACT_ADDRESS = "${address}" as const;`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

