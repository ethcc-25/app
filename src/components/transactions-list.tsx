import { CustomTransaction } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatting";
import { ListItem, Token } from "@worldcoin/mini-apps-ui-kit-react";

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
    />
  );
};

export const TransactionsList = () => {
  const transactions: CustomTransaction[] = [
    {
      id: "1",
      amount: 100,
      type: "deposit",
      date: new Date(),
    },
    {
      id: "2",
      amount: 100,
      type: "withdrawal",
      date: new Date(),
    },
    {
      id: "3",
      amount: 100,
      type: "deposit",
      date: new Date(),
    },
    {
      id: "4",
      amount: 100,
      type: "withdrawal",
      date: new Date(),
    },
    {
      id: "5",
      amount: 100,
      type: "deposit",
      date: new Date(),
    },
    {
      id: "6",
      amount: 100,
      type: "withdrawal",
      date: new Date(),
    },
  ];

  return (
    <div className="w-full space-y-2">
      {transactions.map((transaction) => transactionToListItem(transaction))}
    </div>
  );
};
