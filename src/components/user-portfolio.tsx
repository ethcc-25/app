import { formatNumber } from "@/utils/formatting";
import { Typography } from "@worldcoin/mini-apps-ui-kit-react";

export const UserPortfolio = () => {
  const totalUsd = 23456.27682782;
  const generatedRewards = 1234.3456789;
  const currentApr = 0.123492792798272;

  return (
    <div className="flex flex-col w-full bg-blue-500/20 p-4 rounded-2xl ">
      <Typography variant="number" level={2}>
        {formatNumber(totalUsd)}
      </Typography>
      <div className="flex justify-between gap-2 items-center mt-4 mb-2">
        <Typography variant="subtitle">Earnings</Typography>
        <Typography variant="number" level={4} className="text-green-primary">
          +{formatNumber(generatedRewards)}
        </Typography>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <Typography variant="subtitle">Net APR</Typography>
        <Typography variant="number" level={4}>
          {formatNumber(currentApr, { style: "percent" })}
        </Typography>
      </div>
    </div>
  );
};
