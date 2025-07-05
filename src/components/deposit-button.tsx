"use client";

import { YIELD_MANAGERS } from "@/constants/contracts";
import { useBestOpportunity } from "@/hooks/queries/useBestOpportunity";
import { ChainIdDomainMapping } from "@/utils/protocols";
import { buildDepositTransaction } from "@/utils/transactions";

import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";

export const DepositButton = () => {
  const usdcAmountToDeposit = 0.01;
  const YIELD_MANAGER_ADDRESS = YIELD_MANAGERS[worldchain.id];

  const [buttonState, setButtonState] = useState<
    "pending" | "success" | "failed" | undefined
  >(undefined);
  const [whichButton, setWhichButton] = useState<"getToken" | "usePermit2">(
    "getToken"
  );
  const [transactionId, setTransactionId] = useState<string>("");

  const { data: session } = useSession();
  const userAddress = session?.user?.id;

  const {
    data: bestOpportunity,
    isLoading,
    error: bestOpportunityError,
  } = useBestOpportunity(userAddress);

  const client = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
    error,
  } = useWaitForTransactionReceipt({
    client: client,
    appConfig: {
      app_id: process.env.NEXT_PUBLIC_APP_ID as `app_${string}`,
    },
    transactionId: transactionId,
  });

  useEffect(() => {
    if (transactionId && !isConfirming) {
      if (isConfirmed) {
        console.log("Transaction confirmed!");
        setButtonState("success");
        setTimeout(() => {
          setButtonState(undefined);
        }, 3000);
      } else if (isError) {
        console.error("Transaction failed:", error);
        setButtonState("failed");
        setTimeout(() => {
          setButtonState(undefined);
        }, 3000);
      }
    }
  }, [isConfirmed, isConfirming, isError, error, transactionId]);

  const onClickUsePermit2 = async () => {
    setTransactionId("");
    setWhichButton("usePermit2");
    setButtonState("pending");

    const dstChainId = bestOpportunity?.chainId || 0;
    const dstYieldManager = YIELD_MANAGERS[dstChainId];

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
        state={whichButton === "usePermit2" ? buttonState : undefined}
        className="w-full"
      >
        <Button
          onClick={onClickUsePermit2}
          disabled={buttonState === "pending" || !bestOpportunity}
          size="lg"
          variant="primary"
          fullWidth
        >
          Deposit USD
        </Button>
      </LiveFeedback>
    </div>
  );
};
