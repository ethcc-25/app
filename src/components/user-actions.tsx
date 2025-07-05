import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { DepositButton } from "./deposit-button";

export const UserActions = () => {
  return (
    <div className="w-full flex gap-2">
      <div className="w-1/2">
        <DepositButton />
      </div>
      <div className="w-1/2">
        <Button fullWidth variant="secondary">
          Withdraw
        </Button>
      </div>
    </div>
  );
};
