export type CustomTransaction = {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  date: Date;
};

export type FormattingOptions = {
  decimals?: number;
  currency?: string;
  style?: "currency" | "decimal" | "percent";
};

export type ButtonState = "pending" | "success" | "failed" | undefined;
