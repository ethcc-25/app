import { API_ROOT } from "@/constants/api";
import type { ApiResponse, DepositRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";

const initializeDeposit = async (
  depositRequest: DepositRequest
): Promise<ApiResponse<unknown>> => {
  console.log("initializing deposit", depositRequest);
  const response = await fetch(`${API_ROOT}/deposit/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(depositRequest),
  });

  if (!response.ok) {
    throw new Error("Failed to initialize deposit");
  }

  const data = await response.json();
  console.log("deposit initialized", data);

  return data;
};

export const useInitializeDeposit = () => {
  return useMutation({
    mutationFn: initializeDeposit,
  });
};
