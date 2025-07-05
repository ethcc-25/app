import YieldManagerABI from "@/abi/YieldManager.json";
import type { SupportedChainDomain } from "@/types";
import {
  Tokens,
  tokenToDecimals,
  type SendTransactionInput,
} from "@worldcoin/minikit-js";

export const buildDepositTransaction = (
  contractAddress: string,
  usdcAmountToDeposit: number,
  args: {
    poolId: number;
    chainDomain: SupportedChainDomain;
    dstYieldManager: string;
    vaultAddress: string;
  }
): SendTransactionInput => {
  const usdcAddress = "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1";

  console.log(
    "----> DEPOSIT WITH ARGS",
    contractAddress,
    usdcAmountToDeposit,
    args
  );

  const permitTransfer = {
    permitted: {
      token: usdcAddress,
      amount: tokenToDecimals(usdcAmountToDeposit, Tokens.USDC).toString(),
    },
    nonce: Date.now().toString(),
    deadline: Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString(),
  };

  const transferDetails = {
    to: contractAddress,
    requestedAmount: (usdcAmountToDeposit * 10 ** 6).toString(),
  };

  return {
    transaction: [
      {
        address: contractAddress,
        abi: YieldManagerABI,
        functionName: "signatureTransfer",
        args: [
          args.poolId,
          args.chainDomain,
          args.dstYieldManager,
          args.vaultAddress,
          [
            [permitTransfer.permitted.token, permitTransfer.permitted.amount],
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
        spender: contractAddress,
      },
    ],
  };
};
