import type { Chain } from "viem";

export type CustomTransaction = {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  date: Date;
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
}

export type MondeToken = {
  symbol: string;
  name: string;
};

export type BestOpportunityData = {
  protocol: string;
  chain: string;
  chainId: number;
  apy: number;
  poolApy: number;
  rewardsApy: number;
  tvl: number;
  poolName: string;
  poolAddress: string;
  symbol: string;
  tokens: MondeToken[];
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
