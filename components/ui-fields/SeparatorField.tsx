"use client";
import { Minus } from "lucide-react";
import { ElementType, FormElement } from "../FormElements";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";

const type: ElementType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  designerComponent: SeparatorFieldDesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: Minus,
    label: "Separator Field",
  },
};

function SeparatorFieldDesignerComponent() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator />
    </div>
  );
}

function PropertiesComponent() {
  return <p>No properties</p>;
}

function FormComponent() {
  return <Separator />;
}
