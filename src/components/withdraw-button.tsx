"use client";

import { useInitializeWithdraw } from "@/hooks/queries/useInitializeWithdraw";
import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const WithdrawButton = () => {
  const { data: session } = useSession();
  const userAddress = session?.user?.id;
  const queryClient = useQueryClient();

  const [buttonState, setButtonState] = useState<
    "pending" | "success" | "failed" | undefined
  >(undefined);

  const { mutate: initializeWithdraw } = useInitializeWithdraw();
  const { data: userProfile } = useUserProfile(userAddress);

  const hasNoFunds = Number(userProfile?.summary?.netAmount || 0) === 0;

  const handleWithdraw = () => {
    if (!userAddress) return;

    setButtonState("pending");
    initializeWithdraw(userAddress, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-profile", userAddress],
        });
        setButtonState("success");
        setTimeout(() => {
          setButtonState(undefined);
        }, 3000);
      },
      onError: (error) => {
        console.error("Withdrawal failed:", error);
        setButtonState("failed");
        setTimeout(() => {
          setButtonState(undefined);
        }, 3000);
      },
    });
  };

  return (
    <LiveFeedback
      label={{
        failed: "Withdrawal failed",
        pending: "Withdrawal pending",
        success: "Withdrawal successful",
      }}
      state={buttonState}
      className="w-full"
    >
      <Button
        onClick={handleWithdraw}
        disabled={buttonState === "pending" || !userAddress || hasNoFunds}
        size="lg"
        variant="primary"
        fullWidth
      >
        Withdraw
      </Button>
    </LiveFeedback>
  );
};
