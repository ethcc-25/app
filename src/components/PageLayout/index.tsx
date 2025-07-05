import clsx from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Page = (props: { children: ReactNode; className?: string }) => {
  return (
    <div className={twMerge(clsx("flex h-dvh flex-col", props.className))}>
      {props.children}
    </div>
  );
};

const Header = (props: { children: ReactNode; className?: string }) => {
  return (
    <header
      className={twMerge(
        "bg-background flex flex-col justify-center p-6 z-10",
        clsx(props.className)
      )}
    >
      {props.children}
    </header>
  );
};

const Main = (props: { children: ReactNode; className?: string }) => {
  return (
    <main
      className={twMerge(
        clsx("grow overflow-y-auto p-6 pt-3", props.className)
      )}
    >
      {props.children}
    </main>
  );
};

const Footer = (props: { children: ReactNode; className?: string }) => {
  return (
    <footer className={twMerge("px-6 pt-3 pb-[35px]", clsx(props.className))}>
      {props.children}
    </footer>
  );
};

Page.Header = Header;
Page.Main = Main;
Page.Footer = Footer;
