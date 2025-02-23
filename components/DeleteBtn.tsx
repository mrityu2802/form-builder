"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteForm } from "@/actions/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";

const DeleteBtn = ({ id, title }: { id: string; title?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteForm(id);
    toast.success("Form deleted");
    router.push("/");
  };

  return (
    <Button
      className="text-destructive border hover:bg-destructive/90 hover:text-white"
      variant="outline"
      size="sm"
      onClick={handleDelete}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <Trash className="w-4 h-4" />
          {title}
        </>
      )}
    </Button>
  );
};

export default DeleteBtn;
