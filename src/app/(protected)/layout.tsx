import { auth } from "@/auth";
import { Navigation } from "@/components/Navigation";
import { Page } from "@/components/PageLayout";

export default async function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    console.log("Not authenticated");
    // TODO: redirect('/');
  }

  return (
    <Page>
      {children}
      <Page.Footer className="fixed bottom-0 w-full bg-background">
        <Navigation />
      </Page.Footer>
    </Page>
  );
}
