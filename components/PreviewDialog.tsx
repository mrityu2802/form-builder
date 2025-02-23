import React from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import useDesigner from "@/hooks/useDesigner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import { FormElements } from "./FormElements";
const PreviewDialog = () => {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <EyeIcon className="w-4 h-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 border-b">
        <DialogTitle className="hidden">Form preview</DialogTitle>
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form preview
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/graph-paper.svg)] overflow-y-auto">
          <div className="max-w-[700px] flex flex-col flex-grow bg-background h-full w-full rounded-lg p-8 overflow-y-auto gap-2">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PreviewDialog;
