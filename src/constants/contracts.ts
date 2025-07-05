import { arbitrum, base, optimism, worldchain } from "viem/chains";

export const YIELD_MANAGERS: Record<number, string> = {
  // [mainnet.id]: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
  [optimism.id]: "0x260857AA3776B50363091839998B8Dd688C585d7",
  [arbitrum.id]: "0x260857AA3776B50363091839998B8Dd688C585d7",
  [base.id]: "0x260857AA3776B50363091839998B8Dd688C585d7",
  [worldchain.id]: "0x260857AA3776B50363091839998B8Dd688C585d7",
};
