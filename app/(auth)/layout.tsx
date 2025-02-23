import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-center justify-center h-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
