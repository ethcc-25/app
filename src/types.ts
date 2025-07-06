import type { Chain } from "viem";

export type CustomTransaction = {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  date: Date;
  status: "pending" | "success" | "failed";
  srcTxHash?: string;
  destTxHash?: string;
  protocol: SupportedProtocol;
  chainDomain: SupportedChainDomain;
};

export type FormattingOptions = {
  decimals?: number;
  currency?: string;
  style?: "currency" | "decimal" | "percent";
};

export type ButtonState = "pending" | "success" | "failed" | undefined;

export enum SupportedProtocol {
  AAVE = 1,
  MORPHO = 2,
  FLUID = 3,
}

export enum SupportedChainDomain {
  ETHEREUM = 0,
  OPTIMISM = 2,
  ARBITRUM = 3,
  BASE = 6,
  WORLDCHAIN = 14,
}

export type MondeToken = {
  symbol: string;
  name: string;
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export type UserPosition = {
  id: string;
  chain: Chain;
  protocol: SupportedProtocol;
  amount: number;
  apr: number;
};

export type Opportunity = {
  chainId: number;
  protocol: SupportedProtocol;
  apy: number;
  poolName: string;
  poolAddress: string;
};

export interface DepositRequest {
  srcChainId: Opportunity["chainId"];
  destChainId: Opportunity["chainId"];
  userWallet: string;
  amount: string;
  opportunity: {
    chainId: Opportunity["chainId"];
    protocol: Opportunity["protocol"];
    poolAddress: Opportunity["poolAddress"];
  };
  bridgeTransactionHash: string;
}

export interface Position {
  pool: number;
  positionId: string;
  user: string;
  amountUsdc: string;
  shares: string;
  vault: string;
}

export interface UserProfileDeposit {
  id: string;
  amount: string;
  status: string;
  srcChainDomain: number;
  dstChainDomain: number;
  srcChainName: string;
  dstChainName: string;
  protocol: number;
  apy: number;
  bridgeTransactionHash: string;
  depositTxHash?: string;
  createdAt: Date;
  updatedAt: Date;
  errorMessage?: string;
}

export interface UserProfileWithdraw {
  id: string;
  amount: string;
  status: string;
  srcChainDomain: number;
  dstChainDomain: number;
  srcChainName: string;
  dstChainName: string;
  protocol: number;
  initWithdrawTxHash?: string;
  processWithdrawTxHash?: string;
  createdAt: Date;
  updatedAt: Date;
  errorMessage?: string;
}

export interface UserProfile {
  userAddress: string;
  activePosition: {
    hasPosition: boolean;
    position: Position | null;
    chainDomain: number | null;
    chainName: string | null;
    protocolName: string | null;
  };
  deposits: UserProfileDeposit[];
  withdraws: UserProfileWithdraw[];
  summary: {
    totalDeposited: string;
    totalWithdrawn: string;
    netAmount: string;
    totalDeposits: number;
    totalWithdraws: number;
    completedDeposits: number;
    completedWithdraws: number;
    pendingDeposits: number;
    pendingWithdraws: number;
  };
}
