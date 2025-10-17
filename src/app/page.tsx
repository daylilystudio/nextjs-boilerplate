import Image from "next/image";
import { getSession } from "@/lib/auth";
import LoginButton from "@/components/LoginButton";

export default async function Home() {
  const session = await getSession();
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session &&
        <div className="flex items-center gap-3">
          {session.user?.image && <Image className="rounded-full" width={32} height={32} src={session.user?.image} alt={session.user?.name || ''} />}
          Hi, {session.user?.email}
        </div>}
        <LoginButton isLogin={!!session} />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        I&apos;m footer.
      </footer>
    </div>
  );
}
