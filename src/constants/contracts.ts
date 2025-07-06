import { base, worldchain } from "viem/chains";

export const YIELD_MANAGERS: Record<number, string> = {
  // [mainnet.id]: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
  // [optimism.id]: "0x260857AA3776B50363091839998B8Dd688C585d7",
  // [arbitrum.id]: "0x260857AA3776B50363091839998B8Dd688C585d7",
  [base.id]: "0x082610c018994d141c507428AB1476E45C17582f",
  [worldchain.id]: "0x02CFa5cFd2D9A22019f62AC97626e06ae6D39139",
};

export const USDC_ADDRESS = "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1";
