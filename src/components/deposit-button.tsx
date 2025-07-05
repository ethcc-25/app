"use client";

import YieldManagerABI from "@/abi/YieldManager.json";

import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";

const YIELD_MANAGER_ADDRESS = "0xe93E198Bbaab12C03579608Cd0C7C9e099A00cA6";

export const DepositButton = () => {
  // See the code for this contract here: https://worldscan.org/address/0xF0882554ee924278806d708396F1a7975b732522#code
  const myContractToken = YIELD_MANAGER_ADDRESS;
  const usdcAmountToDeposit = 0.01;
  const [buttonState, setButtonState] = useState<
    "pending" | "success" | "failed" | undefined
  >(undefined);
  const [whichButton, setWhichButton] = useState<"getToken" | "usePermit2">(
    "getToken"
  );

  // This triggers the useWaitForTransactionReceipt hook when updated
  const [transactionId, setTransactionId] = useState<string>("");

  // Feel free to use your own RPC provider for better performance
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
    const address = YIELD_MANAGER_ADDRESS;

    // Permit2 is valid for max 1 hour
    const permitTransfer = {
      permitted: {
        token: "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1",
        amount: (usdcAmountToDeposit * 10 ** 6).toString(),
      },
      nonce: Date.now().toString(),
      deadline: Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString(),
    };

    const transferDetails = {
      to: address,
      requestedAmount: (usdcAmountToDeposit * 10 ** 6).toString(),
    };

    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: myContractToken,
            abi: YieldManagerABI,
            functionName: "signatureTransfer",
            args: [
              1,
              3,
              "0x260857AA3776B50363091839998B8Dd688C585d7",
              // TODO: Change to real vault address
              "0x260857AA3776B50363091839998B8Dd688C585d7",
              [
                [
                  permitTransfer.permitted.token,
                  permitTransfer.permitted.amount,
                ],
                permitTransfer.nonce,
                permitTransfer.deadline,
              ],
              [transferDetails.to, transferDetails.requestedAmount],
              "PERMIT2_SIGNATURE_PLACEHOLDER_0",
            ],
          },
        ],
        permit2: [
          {
            ...permitTransfer,
            spender: myContractToken,
          },
        ],
      });

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
          disabled={buttonState === "pending"}
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
