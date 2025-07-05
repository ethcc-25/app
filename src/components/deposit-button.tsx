"use client";

import type { ButtonState } from "@/types";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit, Tokens, tokenToDecimals } from "@worldcoin/minikit-js";
import { useState } from "react";

export const DepositButton = () => {
  const [buttonState, setButtonState] = useState<ButtonState>(undefined);

  const onClickDeposit = async () => {
    // TODO: Change this
    const address = (await MiniKit.getUserByUsername("alex")).walletAddress;

    setButtonState("pending");

    const res = await fetch("/api/initiate-payment", {
      method: "POST",
    });
    const { id } = await res.json();

    const result = await MiniKit.commandsAsync.pay({
      reference: id,
      to: address ?? "0x0000000000000000000000000000000000000000",
      tokens: [
        {
          symbol: Tokens.USDC,
          token_amount: tokenToDecimals(100, Tokens.USDC).toString(),
        },
      ],
      description: "Deposit to Monde",
    });

    console.log("Deposit", result.finalPayload);

    if (result.finalPayload.status === "success") {
      setButtonState("success");
    } else {
      setButtonState("failed");
      setTimeout(() => {
        setButtonState(undefined);
      }, 3000);
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
