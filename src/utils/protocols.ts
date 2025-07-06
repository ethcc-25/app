import aaveLogo from "@/assets/aave.svg";
import fluidLogo from "@/assets/fluid.svg";
import morphoLogo from "@/assets/morpho.svg";

import arbitrumLogo from "@/assets/arbitrum.svg";
import baseLogo from "@/assets/base.svg";
import optimismLogo from "@/assets/optimism.svg";
import worldchainLogo from "@/assets/world.svg";

import { SupportedChainDomain, SupportedProtocol } from "@/types";
import type { StaticImageData } from "next/image";
import { arbitrum, base, optimism, worldchain, type Chain } from "viem/chains";

export const ProtocolIdDataMapping: Record<
  SupportedProtocol,
  { name: string; logo: StaticImageData }
> = {
  [SupportedProtocol.AAVE]: {
    name: "Aave",
    logo: aaveLogo,
  },
  [SupportedProtocol.FLUID]: {
    name: "Fluid",
    logo: fluidLogo,
  },
  [SupportedProtocol.MORPHO]: {
    name: "Morpho",
    logo: morphoLogo,
  },
};

export const ChainIdDomainMapping: Record<number, SupportedChainDomain> = {
  // [mainnet.id]: SupportedChainDomain.ETHEREUM,
  [base.id]: SupportedChainDomain.BASE,
  [arbitrum.id]: SupportedChainDomain.ARBITRUM,
  [optimism.id]: SupportedChainDomain.OPTIMISM,
  [worldchain.id]: SupportedChainDomain.WORLDCHAIN,
};

export const ChainIdDataMapping: Record<
  number,
  { name: string; logo: StaticImageData }
> = {
  // [SupportedChainDomain.ETHEREUM]: {
  //   name: "Ethereum",
  //   logo: ethereumLogo,
  // },
  [SupportedChainDomain.OPTIMISM]: {
    name: "Optimism",
    logo: optimismLogo,
  },
  [SupportedChainDomain.ARBITRUM]: {
    name: "Arbitrum",
    logo: arbitrumLogo,
  },
  [SupportedChainDomain.BASE]: {
    name: "Base",
    logo: baseLogo,
  },
  [SupportedChainDomain.WORLDCHAIN]: {
    name: "Worldchain",
    logo: worldchainLogo,
  },
};

export const ChainDomainToChainMapping: Record<SupportedChainDomain, Chain> = {
  [SupportedChainDomain.OPTIMISM]: optimism,
  [SupportedChainDomain.ARBITRUM]: arbitrum,
  [SupportedChainDomain.BASE]: base,
  [SupportedChainDomain.WORLDCHAIN]: worldchain,
  [SupportedChainDomain.ETHEREUM]: arbitrum, // Fallback, not currently used
};

export const getChainFromDomain = (domain: SupportedChainDomain): Chain => {
  return ChainDomainToChainMapping[domain];
};

export const getBlockExplorerUrl = (chain: Chain, txHash: string): string => {
  const explorer = chain.blockExplorers?.default;
  if (!explorer) return "";
  return `${explorer.url}/tx/${txHash}`;
};
