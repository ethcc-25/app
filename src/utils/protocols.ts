import aaveLogo from "@/assets/aave.svg";
import fluidLogo from "@/assets/fluid.svg";
import morphoLogo from "@/assets/morpho.svg";

import arbitrumLogo from "@/assets/arbitrum.svg";
import baseLogo from "@/assets/base.svg";
import optimismLogo from "@/assets/optimism.svg";

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
