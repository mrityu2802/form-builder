import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Avatar } from "@/components/ui/avatar";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2">
        <Link
          href="/"
          className="flex items-centerbg-gradient-to-b from-background to-secondary/20 hover:cursor-pointer"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-foreground text-transparent bg-clip-text">
            Form Builder
          </h1>
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
