"use client";

import { useUserProfile } from "@/hooks/queries/useUserProfile";
import { CustomTransaction } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatting";
import { ListItem, Token } from "@worldcoin/mini-apps-ui-kit-react";
import { CheckCircle, WarningCircle, XmarkCircle } from "iconoir-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const mapStatus = (status: string): "pending" | "success" | "failed" => {
  if (status === "completed") return "success";
  if (status === "failed") return "failed";
  return "pending";
};

const transactionToListItem = (transaction: CustomTransaction) => {
  const formattedAmount = formatNumber(transaction.amount);
  const label =
    transaction.type === "deposit"
      ? `Deposited ${formattedAmount}`
      : `Withdrew ${formattedAmount}`;

  return (
    <ListItem
      key={transaction.id}
      label={label}
      description={formatDate(transaction.date)}
      startAdornment={
        <Token
          value="USDC"
          size={40}
          disabled={transaction.type === "withdrawal"}
        />
      }
      endAdornment={
        transaction.status === "success" ? (
          <CheckCircle
            className="text-green-500"
            strokeWidth={2}
            width={20}
            height={20}
          />
        ) : transaction.status === "failed" ? (
          <XmarkCircle
            className="text-red-500"
            strokeWidth={2}
            width={20}
            height={20}
          />
        ) : (
          <WarningCircle
            className="text-yellow-500"
            strokeWidth={2}
            width={20}
            height={20}
          />
        )
      }
    />
  );
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
      })
    );

    const withdrawals = userProfile.withdraws.map(
      (withdraw): CustomTransaction => ({
        id: withdraw.id,
        amount: parseFloat(withdraw.amount) / 10 ** 6,
        type: "withdrawal" as const,
        date: new Date(withdraw.createdAt),
        status: mapStatus(withdraw.status),
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
          <div className="h-16 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-16 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
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
      {transactions.map((transaction) => transactionToListItem(transaction))}
    </div>
  );
};
