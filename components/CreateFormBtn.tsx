import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const CreateFormBtn = () => {
  return (
    <Button variant="outline" size="sm" className="gap-2">
      <PlusIcon className="w-4 h-4" />
      Create
    </Button>
  );
};

export default CreateFormBtn;
