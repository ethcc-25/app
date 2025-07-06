"use client";

import { YIELD_MANAGERS } from "@/constants/contracts";
import { useBestOpportunity } from "@/hooks/queries/useBestOpportunity";
import { useInitializeDeposit } from "@/hooks/queries/useInitializeDeposit";
import { ChainIdDomainMapping } from "@/utils/protocols";
import { buildDepositTransaction } from "@/utils/transactions";

import { useQueryClient } from "@tanstack/react-query";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit, Tokens, tokenToDecimals } from "@worldcoin/minikit-js";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";

export const DepositButton = () => {
  const usdcAmountToDeposit = 0.1;
  const YIELD_MANAGER_ADDRESS = YIELD_MANAGERS[worldchain.id];

  const [buttonState, setButtonState] = useState<
    "pending" | "success" | "failed" | undefined
  >(undefined);
  const [transactionId, setTransactionId] = useState<string>("");
  const processedTransactionHashes = useRef<Set<string>>(new Set());

  const { data: session } = useSession();
  const userAddress = session?.user?.id;
  const queryClient = useQueryClient();

  const { data: bestOpportunity } = useBestOpportunity(userAddress);

  const initializeDeposit = useInitializeDeposit();

  const dstChainId = bestOpportunity?.chainId || 0;
  const dstYieldManager = YIELD_MANAGERS[dstChainId];

  const client = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  const {
    transactionHash,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
    error,
  } = useWaitForTransactionReceipt({
    client: client,
    appConfig: {
      app_id: process.env.NEXT_PUBLIC_APP_ID!,
    },
    transactionId: transactionId,
  });

  useEffect(() => {
    if (
      transactionHash &&
      bestOpportunity &&
      userAddress &&
      !processedTransactionHashes.current.has(transactionHash)
    ) {
      processedTransactionHashes.current.add(transactionHash);

      const depositRequest = {
        srcChainId: worldchain.id,
        destChainId: dstChainId,
        userWallet: userAddress,
        amount: tokenToDecimals(usdcAmountToDeposit, Tokens.USDC).toString(),
        opportunity: {
          chainId: bestOpportunity.chainId,
          protocol: bestOpportunity.protocol,
          poolAddress: bestOpportunity.poolAddress,
        },
        bridgeTransactionHash: transactionHash,
      };

      console.log("----> INITIALIZING DEPOSIT", depositRequest);
      initializeDeposit.mutate(depositRequest, {
        onSuccess: () => {
          console.log("Deposit initialization completed!");
          queryClient.invalidateQueries({
            queryKey: ["user-profile", userAddress],
          });
          setButtonState("success");
          setTimeout(() => {
            setButtonState(undefined);
          }, 3000);
        },
        onError: (error) => {
          console.error("Deposit initialization failed:", error);
          setButtonState("failed");
          setTimeout(() => {
            setButtonState(undefined);
          }, 3000);
        },
      });
    }
  }, [
    transactionHash,
    bestOpportunity,
    userAddress,
    dstChainId,
    usdcAmountToDeposit,
    queryClient,
  ]);

  useEffect(() => {
    if (transactionId && !isConfirming && isError) {
      console.error("Transaction failed:", error);
      setButtonState("failed");
      setTimeout(() => {
        setButtonState(undefined);
      }, 3000);
    }
  }, [isConfirmed, isConfirming, isError, error, transactionId]);

  const onClickUsePermit2 = async () => {
    setTransactionId("");
    setButtonState("pending");

    if (!dstYieldManager) {
      console.error("No yield manager found for chain id:", dstChainId);
      setButtonState("failed");
      return;
    }

    const transactionToExecute = buildDepositTransaction(
      YIELD_MANAGER_ADDRESS,
      usdcAmountToDeposit,
      {
        poolId: bestOpportunity?.protocol || 0,
        chainDomain: ChainIdDomainMapping[dstChainId],
        dstYieldManager: dstYieldManager,
        vaultAddress: bestOpportunity?.poolAddress || "",
      }
    );

    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction(
        transactionToExecute
      );

      if (finalPayload.status === "success") {
        console.log(
          "Transaction submitted, waiting for confirmation:",
          finalPayload.transaction_id
        );
        setTransactionId(finalPayload.transaction_id);
      } else {
        console.error("Transaction submission failed:", finalPayload);
        setButtonState("failed");
      }
    } catch (err) {
      console.error("Error sending transaction:", err);
      setButtonState("failed");
    }
  };

  return (
    <div className="grid w-full gap-4">
      <LiveFeedback
        label={{
          failed: "Transaction failed",
          pending: "Transaction pending",
          success: "Transaction successful",
        }}
        state={buttonState}
        className="w-full"
      >
        <Button
          onClick={onClickUsePermit2}
          disabled={buttonState === "pending" || !bestOpportunity}
          size="lg"
          variant="primary"
          fullWidth
        >
          Deposit {usdcAmountToDeposit} USD
        </Button>
      </LiveFeedback>
    </div>
  );
};
