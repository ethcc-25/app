"use client";

import { CustomTransaction, SupportedChainDomain } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatting";
import {
  ChainIdDataMapping,
  getBlockExplorerUrl,
  getChainFromDomain,
  ProtocolIdDataMapping,
} from "@/utils/protocols";
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
import { ArrowRight, CheckCircle, Clock, XmarkCircle } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";

interface TransactionListItemProps {
  transaction: CustomTransaction;
}

const TransactionFlowVisualization = ({
  transaction,
}: {
  transaction: CustomTransaction;
}) => {
  const isDeposit = transaction.type === "deposit";
  const yieldChain = getChainFromDomain(transaction.chainDomain);
  const worldChain = getChainFromDomain(SupportedChainDomain.WORLDCHAIN);

  const protocolData = ProtocolIdDataMapping[transaction.protocol];
  const yieldChainData = ChainIdDataMapping[transaction.chainDomain];
  const worldChainData = ChainIdDataMapping[SupportedChainDomain.WORLDCHAIN];

  // For deposits: World -> Yield Chain -> Protocol
  // For withdrawals: Protocol -> Yield Chain -> World
  const steps = isDeposit
    ? [
        {
          label: "WorldChain",
          logo: worldChainData.logo,
          txHash: transaction.srcTxHash,
          chain: worldChain,
        },
        {
          label: yieldChainData.name,
          logo: yieldChainData.logo,
          txHash: transaction.destTxHash,
          chain: yieldChain,
        },
        {
          label: protocolData.name,
          logo: protocolData.logo,
          txHash: null,
          chain: null,
        },
      ]
    : [
        {
          label: protocolData.name,
          logo: protocolData.logo,
          txHash: transaction.srcTxHash,
          chain: yieldChain,
        },
        {
          label: yieldChainData.name,
          logo: yieldChainData.logo,
          txHash: transaction.destTxHash,
          chain: worldChain,
        },
        {
          label: "WorldChain",
          logo: worldChainData.logo,
          txHash: null,
          chain: null,
        },
      ];

  const getArrowState = (index: number) => {
    if (index === 0) {
      // First arrow: completed if srcTxHash exists
      return transaction.srcTxHash ? "completed" : "inactive";
    } else if (index === 1) {
      // Second arrow: completed if destTxHash exists, pending if srcTxHash exists but not destTxHash
      if (transaction.destTxHash) return "completed";
      if (transaction.srcTxHash) return "pending";
      return "inactive";
    }
    return "inactive";
  };

  const getArrowClasses = (state: string) => {
    switch (state) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500 animate-pulse";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      <Typography className="font-medium text-gray-700">
        Transaction Flow
      </Typography>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <Image
                  src={step.logo}
                  alt={step.label}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <Typography className="text-xs text-center font-medium">
                {step.label}
              </Typography>
              {step.txHash && step.chain && (
                <Link
                  href={getBlockExplorerUrl(step.chain, step.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  View Tx
                </Link>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center justify-center mx-4">
                <ArrowRight
                  className={`w-5 h-5 ${getArrowClasses(getArrowState(index))}`}
                  strokeWidth={2.5}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

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

          {/* Horizontal divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* Transaction flow visualization */}
          <TransactionFlowVisualization transaction={transaction} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
