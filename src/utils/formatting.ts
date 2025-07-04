import { FormattingOptions } from "@/types";

export const formatNumber = (
  number: number,
  options: FormattingOptions = {}
) => {
  const { decimals = 2, currency = "USD", style = "currency" } = options;

  return new Intl.NumberFormat("en-US", {
    style,
    currency,
    minimumFractionDigits: decimals,
  }).format(number);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
