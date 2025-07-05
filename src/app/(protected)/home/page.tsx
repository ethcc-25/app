import { auth } from "@/auth";
import BestOpportunity from "@/components/BestOpportunity";
import { Page } from "@/components/PageLayout";
import { TransactionsList } from "@/components/transactions-list";
import { UserActions } from "@/components/user-actions";
import { UserPortfolio } from "@/components/user-portfolio";
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <TopBar
        title="Portfolio"
        endAdornment={
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold capitalize">
              {session?.user.username}
            </p>
          </div>
        }
      />
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16">
        <UserPortfolio />
        <UserActions />
        <BestOpportunity />
        <TransactionsList />
      </Page.Main>
    </>
  );
}
