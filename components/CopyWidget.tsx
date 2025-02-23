"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "@prisma/client";
import { Clipboard, CopyIcon } from "lucide-react";

const CopyWidget = ({ form }: { form: Form }) => {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/submit/${form.id}`
      : "";
  return (
    <div className="my-4 flex gap-2 items-center justify-between w-full border-b pb-4">
      <Input className="w-full" value={url} readOnly />
      <Button
        className="group"
        size="lg"
        variant="outline"
        onClick={() => {
          navigator.clipboard.writeText(url);
          toast.success("Copied to clipboard");
        }}
      >
        <Clipboard className="w-4 h-4 hidden group-hover:block transition-all" />
        <CopyIcon className="w-4 h-4 block group-hover:hidden transition-all" />
        Copy Url
      </Button>
    </div>
  );
};

export default CopyWidget;
