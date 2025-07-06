"use client";

import { TabItem, Tabs } from "@worldcoin/mini-apps-ui-kit-react";
import { Home } from "iconoir-react";
import Link from "next/link";
import { useState } from "react";

export const Navigation = () => {
  const [value, setValue] = useState("home");

  return (
    <Tabs value={value} onValueChange={setValue}>
      <Link href="/home">
        <TabItem value="home" icon={<Home />} label="Home" />
      </Link>
    </Tabs>
  );
};
