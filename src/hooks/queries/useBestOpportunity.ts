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
