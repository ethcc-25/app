import { auth } from "@/auth";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { DepositButton } from "./deposit-button";

export const UserActions = async () => {
  const session = await auth();

  return (
    <div className="w-full flex gap-2">
      <div className="w-1/2">
        {session?.user.id && <DepositButton userAddress={session.user.id} />}
      </div>
      <div className="w-1/2">
        <Button fullWidth variant="secondary">
          Withdraw
        </Button>
      </div>
    </div>
  );
};
