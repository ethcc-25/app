import { auth } from "@/auth";
import { Page } from "@/components/PageLayout";
import { UserPositions } from "@/components/user-positions";
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <TopBar
        title="Overview"
        endAdornment={
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold capitalize">
              {session?.user.username}
            </p>
          </div>
        }
      />
      <Page.Main className="flex flex-col justify-start gap-4 mb-16">
        <UserPositions />
      </Page.Main>
    </>
  );
}
