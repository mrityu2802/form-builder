import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2">
        <Link
          href="/"
          className="flex items-center bg-gradient-to-r from-red-400 to-slate-400 text-transparent bg-clip-text hover:cursor-pointer"
        >
          <span className="text-2xl font-bold">Form Builder</span>
        </Link>
      </nav>
      <main className="flex w-full flex-grow space-x-4 px-6">{children}</main>
    </div>
  );
};

export default Layout;
