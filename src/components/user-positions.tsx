import { SupportedProtocol } from "@/types";
import { base, mainnet, optimism } from "viem/chains";

export const UserPositions = () => {
  const positions = [
    {
      id: "1",
      chain: base,
      protocol: SupportedProtocol.FLUID,
      amount: 1103.3456789,
      apr: 10.2345678,
    },
    {
      id: "2",
      chain: optimism,
      protocol: SupportedProtocol.AAVE,
      amount: 10000,
      apr: 10.2345678,
    },
    {
      id: "3",
      chain: mainnet,
      protocol: SupportedProtocol.MORPHO,
      amount: 10000,
      apr: 10.2345678,
    },
  ];

  return (
    <div>
      {positions.map((position) => (
        <div key={position.id}>
          <div>{position.chain.name}</div>
          <div>{position.protocol}</div>
          <div>{position.amount}</div>
          <div>{position.apr}</div>
        </div>
      ))}
    </div>
  );
};
