// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint8, externalEuint8 } from "@fhevm/solidity/lib/FHE.sol";
import { ZamaEthereumConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * @title InvestmentPosition
 * @notice Privacy-preserving investment decision assessment using FHE
 * @dev Users submit encrypted answers (1-5), contract computes total score
 */
contract InvestmentPosition is ZamaEthereumConfig {
    // Encrypted result for each user
    mapping(address => euint8) private results;
    
    // Track completion status
    mapping(address => bool) public hasCompleted;
    
    // Total participants
    uint256 public totalParticipants;

    event AssessmentSubmitted(address indexed user, uint256 timestamp);

    /**
     * @notice Submit encrypted assessment answers
     * @param a1-a8 Encrypted answers (each 1-5)
     * @param inputProof Proof for the encrypted inputs
     */
    function submitAssessment(
        externalEuint8 a1,
        externalEuint8 a2,
        externalEuint8 a3,
        externalEuint8 a4,
        externalEuint8 a5,
        externalEuint8 a6,
        externalEuint8 a7,
        externalEuint8 a8,
        bytes calldata inputProof
    ) external {
        require(!hasCompleted[msg.sender], "Already completed");

        // Convert external inputs to internal encrypted values
        euint8 v1 = FHE.fromExternal(a1, inputProof);
        euint8 v2 = FHE.fromExternal(a2, inputProof);
        euint8 v3 = FHE.fromExternal(a3, inputProof);
        euint8 v4 = FHE.fromExternal(a4, inputProof);
        euint8 v5 = FHE.fromExternal(a5, inputProof);
        euint8 v6 = FHE.fromExternal(a6, inputProof);
        euint8 v7 = FHE.fromExternal(a7, inputProof);
        euint8 v8 = FHE.fromExternal(a8, inputProof);

        // Compute total score (sum of all answers)
        euint8 sum1 = FHE.add(v1, v2);
        euint8 sum2 = FHE.add(v3, v4);
        euint8 sum3 = FHE.add(v5, v6);
        euint8 sum4 = FHE.add(v7, v8);
        
        euint8 partial1 = FHE.add(sum1, sum2);
        euint8 partial2 = FHE.add(sum3, sum4);
        
        euint8 total = FHE.add(partial1, partial2);

        // Allow this contract to access the result
        FHE.allowThis(total);
        
        // Allow the user to decrypt their result
        FHE.allow(total, msg.sender);

        // Store result
        results[msg.sender] = total;
        hasCompleted[msg.sender] = true;
        totalParticipants++;

        emit AssessmentSubmitted(msg.sender, block.timestamp);
    }

    /**
     * @notice Get the encrypted result handle for a user
     * @param user Address of the user
     * @return bytes32 The encrypted result handle
     */
    function getResultHandle(address user) external view returns (bytes32) {
        require(hasCompleted[user], "User has not completed assessment");
        return FHE.toBytes32(results[user]);
    }
}

