"use client";

import YieldManagerABI from "@/abi/YieldManager.json";

import type { ButtonState } from "@/types";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit, Tokens, tokenToDecimals } from "@worldcoin/minikit-js";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";

const YIELD_MANAGER_ADDRESS = "0x41516AC491E3bDab02Ac65bE1A553dE602518B93";
const USDC_ADDRESS = "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1";
const DEPOSIT_AMOUNT = 1; // 1 USDC
const PERMIT_DURATION = 30 * 1000; // 30 seconds
const RESET_DELAY = 3000; // 3 seconds

type DepositButtonProps = {
  userAddress: string;
};

export const DepositButton = ({ userAddress }: DepositButtonProps) => {
  const [buttonState, setButtonState] = useState<ButtonState>(undefined);
  const [transactionId, setTransactionId] = useState<string>("");

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
    client,
    transactionId,
    appConfig: { app_id: process.env.NEXT_PUBLIC_APP_ID || "" },
  });

  useEffect(() => {
    if (transactionId && !isConfirming) {
      if (isConfirmed) {
        console.log("Deposit confirmed!");
        setButtonState("success");
        setTimeout(() => {
          setButtonState(undefined);
        }, RESET_DELAY);
      } else if (isError) {
        console.error("Deposit failed:", error);
        setButtonState("failed");
        setTimeout(() => {
          setButtonState(undefined);
        }, RESET_DELAY);
      }
    }
  }, [isConfirmed, isConfirming, isError, error, transactionId]);

  const onClickDeposit = async () => {
    setTransactionId("");
    setButtonState("pending");

    try {
      const amount = tokenToDecimals(DEPOSIT_AMOUNT, Tokens.USDC).toString();
      // const amount = (DEPOSIT_AMOUNT * 10 ** 6).toString();
      const deadline = Math.floor(
        (Date.now() + PERMIT_DURATION) / 1000
      ).toString();

      const permitTransfer = {
        permitted: {
          amount,
          token: USDC_ADDRESS,
        },
        nonce: Date.now().toString(),
        deadline: deadline,
      };

      const initDepositTx = {
        address: YIELD_MANAGER_ADDRESS,
        abi: YieldManagerABI,
        functionName: "initDeposit",
        args: [
          1,
          USDC_ADDRESS,
          permitTransfer.permitted.amount,
          permitTransfer.nonce,
          permitTransfer.deadline,
          "PERMIT2_SIGNATURE_PLACEHOLDER_0",
        ],
      };

      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [initDepositTx],
        permit2: [
          {
            ...permitTransfer,
            spender: YIELD_MANAGER_ADDRESS,
          },
        ],
      });

      if (finalPayload.status === "success") {
        console.log(
          "Deposit transaction submitted:",
          finalPayload.transaction_id
        );
        setTransactionId(finalPayload.transaction_id);
      } else {
        console.error("Deposit transaction failed:", finalPayload);
        setButtonState("failed");
        setTimeout(() => {
          setButtonState(undefined);
        }, RESET_DELAY);
      }
    } catch (err) {
      console.error("Error sending deposit transaction:", err);
      setButtonState("failed");
      setTimeout(() => {
        setButtonState(undefined);
      }, RESET_DELAY);
    }
  };

  return (
    <LiveFeedback
      label={{
        pending: "Depositing",
        success: "Deposited",
        failed: "Deposit failed",
      }}
      state={buttonState}
    >
      <Button fullWidth variant="primary" onClick={onClickDeposit}>
        Deposit
      </Button>
    </LiveFeedback>
  );
};
