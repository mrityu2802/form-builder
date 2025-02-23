import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Avatar } from "@/components/ui/avatar";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();
  console.log(user);
  return (
    <div className="flex flex-col min-h-screen bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2">
        <Link
          href="/"
          className="flex items-center bg-gradient-to-r from-red-400 to-slate-400 text-transparent bg-clip-text hover:cursor-pointer"
        >
          <span className="text-2xl font-bold">Form Builder</span>
        </Link>
        <Avatar className="size-9 shadow-sm">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-9",
                },
              }}
            />
          </SignedIn>
        </Avatar>
      </nav>
      <main className="flex w-full flex-grow space-x-4 px-6 lg:px-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
