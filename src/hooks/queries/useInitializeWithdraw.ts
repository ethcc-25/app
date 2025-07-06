import { API_ROOT } from "@/constants/api";
import type { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

const initializeWithdraw = async (
  userAddress: string
): Promise<ApiResponse<unknown>> => {
  console.log("initializing withdraw", userAddress);
  const response = await fetch(
    `${API_ROOT}/withdraw/initialize/${userAddress}`,
    { method: "POST" }
  );

  if (!response.ok) {
    throw new Error("Failed to initialize withdraw");
  }

  const data = await response.json();
  console.log("withdraw initialized", data);

  return data;
};

export const useInitializeWithdraw = () => {
  return useMutation({
    mutationFn: initializeWithdraw,
  });
};
