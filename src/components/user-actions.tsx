import { auth } from "@/auth";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { DepositButton2 } from "./deposit-button2";

export const UserActions = async () => {
  const session = await auth();

  return (
    <div className="w-full flex gap-2">
      <div className="w-1/2">{session?.user.id && <DepositButton2 />}</div>
      <div className="w-1/2">
        <Button fullWidth variant="secondary">
          Withdraw
        </Button>
      </div>
    </div>
  );
};
