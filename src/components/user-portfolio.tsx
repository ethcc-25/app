"use client";

import { useBestOpportunity } from "@/hooks/queries/useBestOpportunity";
import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { formatNumber } from "@/utils/formatting";
import { Typography } from "@worldcoin/mini-apps-ui-kit-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const UserPortfolio = () => {
  const { data: session } = useSession();
  const userAddress = session?.user?.id;

  const { data: bestOpportunity } = useBestOpportunity(userAddress);

  const { data: userProfile } = useUserProfile(userAddress);

  const totalUsdWithDecimals = parseFloat(
    userProfile?.summary.netAmount || "0"
  );
  const totalUsd = totalUsdWithDecimals / 10 ** 6;

  return (
    <div className="relative flex flex-col justify-between w-full bg-gradient-to-br from-blue-500/20 via-blue-400/5 to-blue-700/20 p-5 rounded-2xl aspect-[86/50]">
      <Image
        src="/logo-coined.svg"
        alt="Monde"
        width={30}
        height={30}
        className="absolute top-5 right-5"
      />
      <div className="w-full">
        <Typography variant="number" level={2}>
          {formatNumber(totalUsd)}
        </Typography>
        <div className="flex gap-2 items-center mt-2">
          <Typography variant="subtitle" level={3}>
            APY –{" "}
            {!!bestOpportunity &&
              formatNumber((bestOpportunity?.apy || 0) / 100, {
                style: "percent",
              })}
          </Typography>
        </div>
      </div>
      <h1 className="absolute bottom-5 right-5 uppercase text-lg !font-black font-urbanist bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] [text-shadow:_0_1px_0_rgba(255,255,255,0.7),_0_2px_1px_rgba(0,0,0,0.2)]">
        {session?.user.username || "User.245"}
      </h1>
    </div>
  );
};
