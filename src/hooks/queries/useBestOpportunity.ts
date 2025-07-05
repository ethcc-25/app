import { API_ROOT } from "@/constants/api";
import type { ApiResponse, BestOpportunityData } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchBestOpportunity = async (): Promise<
  ApiResponse<BestOpportunityData>
> => {
  const response = await fetch(`${API_ROOT}/best-opportunity`);

  if (!response.ok) {
    throw new Error("Failed to fetch best opportunity");
  }

  return response.json();
};

export const useBestOpportunity = () => {
  return useQuery({
    queryKey: ["best-opportunity"],
    queryFn: fetchBestOpportunity,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });
};
