import React from "react";
import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Separator } from "./ui/separator";
const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setSelectedElement(null)}
        >
          <X className="size-4" />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
