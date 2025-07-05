import aaveLogo from "@/assets/aave.png";
import fluidLogo from "@/assets/fluid.png";
import morphoLogo from "@/assets/morpho.png";

import arbitrumLogo from "@/assets/arbitrum.png";
import baseLogo from "@/assets/base.png";
import optimismLogo from "@/assets/optimism.png";

import { SupportedChainDomain, SupportedProtocol } from "@/types";
import type { StaticImageData } from "next/image";
import { arbitrum, base, optimism } from "viem/chains";

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
};
