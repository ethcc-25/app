import { API_ROOT } from "@/constants/api";
import type { Opportunity } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchBestOpportunity = async (
  userAddress: string
): Promise<Opportunity> => {
  console.log("fetching best opportunity for user", userAddress);
  const response = await fetch(
    `${API_ROOT}/best-opportunity?userAddress=${encodeURIComponent(
      userAddress
    )}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch best opportunity");
  }

  const { data } = await response.json();

  // const { data } = {
  //   data: {
  //     protocol: 1,
  //     chainId: 10,
  //     apy: 3.3706437257429567,
  //     poolApy: 3.3706437257429567,
  //     rewardsApy: 0,
  //     tvl: 0,
  //     poolName: "USDC",
  //     poolAddress: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  //     symbol: "USDC",
  //     tokens: [
  //       {
  //         symbol: "USDC",
  //         name: "USDC",
  //         address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  //       },
  //     ],
  //   },
  // };

  console.log("best opportunity", data.poolName);

  return data;
};

export const useBestOpportunity = (userAddress?: string) => {
  return useQuery({
    queryKey: ["best-opportunity", userAddress],
    queryFn: () => fetchBestOpportunity(userAddress!),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    enabled: !!userAddress,
  });
};
