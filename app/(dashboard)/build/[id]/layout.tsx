import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow w-full">
      {children}
    </div>
  );
};

export default Layout;
