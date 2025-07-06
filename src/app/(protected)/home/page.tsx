import { Page } from "@/components/PageLayout";
import { TransactionsList } from "@/components/transactions-list";
import { UserActions } from "@/components/user-actions";
import { UserPortfolio } from "@/components/user-portfolio";
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";

export default async function Home() {
  return (
    <>
      <TopBar title="Portfolio" />
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16">
        <UserPortfolio />
        <UserActions />
        <TransactionsList />
      </Page.Main>
    </>
  );
}
