"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UploadIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { publishForm } from "@/actions/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const PublishForm = ({ id }: { id: string }) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const handlePublish = async () => {
    try {
      await publishForm(id);
      toast.success("Form published successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to publish form");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-gradient-to-r from-red-400 to-slate-400 text-white"
        >
          <UploadIcon className="w-4 h-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will publish your form to the public.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              startTransition(handlePublish);
            }}
          >
            {isLoading ? (
              <>
                Publishing...
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              </>
            ) : (
              "Publish"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishForm;
