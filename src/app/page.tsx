import { Page } from "@/components/PageLayout";
import Image from "next/image";
import { AuthButton } from "../components/AuthButton";

export default function Home() {
  return (
    <Page className="bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-gradient-shift">
      <Page.Main className="flex flex-col justify-between pb-[35px] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/10 pointer-events-none" />

        <div className="relative z-10 flex-1 flex items-center justify-center font-urbanist animate-fade-in">
          <div className="backdrop-blur-sm bg-white/30 border border-white/30 rounded-3xl px-8 py-18 shadow-xl text-center">
            <Image
              src="/logo.svg"
              alt="Monde"
              width={120}
              height={120}
              className="rounded-full mx-auto mb-6 shadow-lg ring-4 ring-blue-500/20 transition-transform duration-300 hover:scale-110 hover:rotate-3"
            />
            <h1 className="text-6xl sm:text-7xl !font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4 animate-slide-up">
              Monde
            </h1>
            <p className="!font-semibold text-gray-700 text-lg max-w-sm mx-auto leading-none animate-slide-up-delay">
              Diversified, stable yield for humans.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-8 animate-slide-up-delay-2">
          <AuthButton />
        </div>
      </Page.Main>
    </Page>
  );
}
