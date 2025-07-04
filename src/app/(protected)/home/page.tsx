import { auth } from "@/auth";
import { Page } from "@/components/PageLayout";
import { Pay } from "@/components/Pay";
import { Transaction } from "@/components/Transaction";
import { TransactionsList } from "@/components/transactions-list";
import { UserPortfolio } from "@/components/user-portfolio";
import { Marble, TopBar } from "@worldcoin/mini-apps-ui-kit-react";

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
            <Marble src={session?.user.profilePictureUrl} className="w-12" />
          </div>
        }
      />
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16">
        <UserPortfolio />
        <TransactionsList />

        <Pay />
        <Transaction />
      </Page.Main>
    </>
  );
}
