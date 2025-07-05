import { formatNumber } from "@/utils/formatting";
import { Typography } from "@worldcoin/mini-apps-ui-kit-react";

export const UserPortfolio = () => {
  const totalUsd = 23456.27682782;
  const generatedRewards = 1234.3456789;
  const currentApr = 0.123492792798272;

  return (
    <div className="flex flex-col justify-between w-full bg-gradient-to-br from-blue-500/20 via-blue-400/5 to-blue-700/20 p-5 rounded-2xl aspect-[86/50]">
      <div className="w-full">
        <Typography variant="number" level={2}>
          {formatNumber(totalUsd)}
        </Typography>
        <div className="flex gap-2 items-center mt-2">
          <Typography variant="subtitle" level={3}>
            Net APR – {formatNumber(currentApr, { style: "percent" })}
          </Typography>
        </div>
      </div>
      <div className="flex justify-between gap-2 items-center mt-4">
        <Typography variant="subtitle">Earnings</Typography>
        <Typography variant="number" level={4} className="text-green-600">
          +{formatNumber(generatedRewards)}
        </Typography>
      </div>
    </div>
  );
};
