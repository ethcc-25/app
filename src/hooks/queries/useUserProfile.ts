import { API_ROOT } from "@/constants/api";
import type { UserProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = async (userAddress: string): Promise<UserProfile> => {
  console.log("fetching profile for user", userAddress);
  const response = await fetch(
    `${API_ROOT}/profile/${encodeURIComponent(userAddress)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const { data } = await response.json();

  console.log("user profile", data);

  return data;
};

export const useUserProfile = (userAddress?: string) => {
  return useQuery({
    queryKey: ["user-profile", userAddress],
    queryFn: () => fetchUserProfile(userAddress!),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
    enabled: !!userAddress,
  });
};
