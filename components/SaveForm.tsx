import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon, Loader2 } from "lucide-react";
import useDesigner from "@/hooks/useDesigner";
import { updateForm } from "@/actions/form";
import { toast } from "sonner";

const SaveForm = ({ id }: { id: string }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonData = JSON.stringify(elements);
      await updateForm(id, jsonData);
      toast.success("Form saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save form");
    }
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      <SaveIcon className="w-4 h-4" />
      Save
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

export default SaveForm;
