import { DepositButton } from "./deposit-button";
import { WithdrawButton } from "./withdraw-button";

export const UserActions = () => {
  return (
    <div className="w-full flex gap-2">
      <div className="w-1/2">
        <DepositButton />
      </div>
      <div className="w-1/2">
        <WithdrawButton />
      </div>
    </div>
  );
};
