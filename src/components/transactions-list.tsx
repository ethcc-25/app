"use client";

import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { CustomTransaction } from "@/types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { TransactionListItem } from "./transactions-list-item";

const mapStatus = (status: string): "pending" | "success" | "failed" => {
  if (status === "completed") return "success";
  if (status === "failed") return "failed";
  return "pending";
};

export const TransactionsList = () => {
  const { data: session } = useSession();
  const userAddress = session?.user?.id;
  const { data: userProfile } = useUserProfile(userAddress);

  const transactions = useMemo(() => {
    if (!userProfile) return [];

    const deposits = userProfile.deposits.map(
      (deposit): CustomTransaction => ({
        id: deposit.id,
        amount: parseFloat(deposit.amount) / 10 ** 6,
        type: "deposit" as const,
        date: new Date(deposit.createdAt),
        status: mapStatus(deposit.status),
        srcTxHash: deposit.bridgeTransactionHash,
        destTxHash: deposit.depositTxHash,
        protocol: deposit.protocol,
        chainDomain: deposit.dstChainDomain,
      })
    );

    const withdrawals = userProfile.withdraws.map(
      (withdraw): CustomTransaction => ({
        id: withdraw.id,
        amount: parseFloat(withdraw.amount) / 10 ** 6,
        type: "withdrawal" as const,
        date: new Date(withdraw.createdAt),
        status: mapStatus(withdraw.status),
        srcTxHash: withdraw.initWithdrawTxHash,
        destTxHash: withdraw.processWithdrawTxHash,
        protocol: withdraw.protocol,
        chainDomain: withdraw.dstChainDomain,
      })
    );

    const allTransactions = [...deposits, ...withdrawals];

    return allTransactions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 20);
  }, [userProfile]);

  if (!userProfile) {
    return (
      <div className="w-full space-y-2">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded-2xl mb-2"></div>
          <div className="h-16 bg-gray-200 rounded-2xl mb-2"></div>
          <div className="h-16 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="w-full text-center py-8 text-gray-500">
        No transactions found
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {transactions.map((transaction) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};
