import aaveLogo from "@/assets/aave.png";
import fluidLogo from "@/assets/fluid.png";
import morphoLogo from "@/assets/morpho.png";
import { SupportedProtocol } from "@/types";
import type { StaticImageData } from "next/image";

export const ProtocolNameMapping: Record<
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
