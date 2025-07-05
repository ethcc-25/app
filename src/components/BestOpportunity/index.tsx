"use client";

import { useBestOpportunity } from "@/hooks/queries/useBestOpportunity";

export default function BestOpportunity() {
  const { data, isLoading, error } = useBestOpportunity();

  if (isLoading) {
    return <div>Loading best opportunity...</div>;
  }

  if (error) {
    return <div>Error fetching best opportunity: {error.message}</div>;
  }

  if (!data || !data.success) {
    return <div>No opportunity data available</div>;
  }

  const { protocol, apy, poolName, chain, tvl } = data.data;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-3">Best Opportunity</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Protocol:</span>
          <span className="font-medium">{protocol}</span>
        </div>
        <div className="flex justify-between">
          <span>Pool:</span>
          <span className="font-medium">{poolName}</span>
        </div>
        <div className="flex justify-between">
          <span>Chain:</span>
          <span className="font-medium capitalize">{chain}</span>
        </div>
        <div className="flex justify-between">
          <span>APY:</span>
          <span className="font-medium text-green-600">{apy.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between">
          <span>TVL:</span>
          <span className="font-medium">
            ${tvl.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>
    </div>
  );
}
