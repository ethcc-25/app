import { arbitrum, base, optimism, worldchain } from "viem/chains";

export const YIELD_MANAGERS: Record<number, string> = {
  // [mainnet.id]: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
  [optimism.id]: "0x99CEE82077422CC12E70680a31a04D67bb170094",
  [arbitrum.id]: "0x02CFa5cFd2D9A22019f62AC97626e06ae6D39139",
  [base.id]: "0x0DA9e9932925751EFd2e5e12E9e0B2219cC40271",
  [worldchain.id]: "0x5dC767263481EFDD4d82C5CFF92Fe591Db2C1e67",
};

export const USDC_ADDRESS = "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1";
