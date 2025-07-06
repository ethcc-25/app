"use client";

import { CustomTransaction } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatting";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  ListItem,
  Token,
  Typography,
} from "@worldcoin/mini-apps-ui-kit-react";
import { CheckCircle, Clock, XmarkCircle } from "iconoir-react";

interface TransactionListItemProps {
  transaction: CustomTransaction;
}

export const TransactionListItem = ({
  transaction,
}: TransactionListItemProps) => {
  const formattedAmount = formatNumber(transaction.amount);
  const label =
    transaction.type === "deposit"
      ? `Deposited ${formattedAmount}`
      : `Withdrew ${formattedAmount}`;

  const statusIcon =
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
      <Clock
        className="text-yellow-500"
        strokeWidth={2}
        width={20}
        height={20}
      />
    );

  const statusText =
    transaction.status === "success"
      ? "Completed"
      : transaction.status === "failed"
      ? "Failed"
      : "Pending";

  return (
    <Drawer height="fit">
      <DrawerTrigger asChild>
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
          endAdornment={statusIcon}
        />
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle>Transaction Details</DrawerTitle>
        </DrawerHeader>
        <div className="my-8 space-y-4">
          <div className="flex justify-between items-center">
            <Typography className="text-gray-500">Type</Typography>
            <Typography className="capitalize">{transaction.type}</Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography className="text-gray-500">Amount</Typography>
            <Typography className="font-semibold">
              {formattedAmount} USDC
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography className="text-gray-500">Status</Typography>
            <div className="flex items-center gap-2">
              {statusIcon}
              <Typography className="capitalize">{statusText}</Typography>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Typography className="text-gray-500">Date</Typography>
            <Typography>{formatDate(transaction.date)}</Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography className="text-gray-500">Transaction ID</Typography>
            <Typography className="font-mono text-sm truncate max-w-32">
              {transaction.id}
            </Typography>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
