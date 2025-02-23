"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex items-center justify-center h-full w-full flex-col gap-4">
      <h1 className="text-4xl text-destructive font-bold">
        Something went wrong
      </h1>
      <Button asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
