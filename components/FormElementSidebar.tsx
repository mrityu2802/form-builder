import React from "react";
import { FormElements } from "./FormElements";
import SidebarElementList from "./SidebarElementList";
import { Separator } from "./ui/separator";

const FormElementSidebar = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Elements</h1>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-muted-foreground text-sm col-span-1 md:col-span-2 my-1 w-full place-self-start">
          Layout Elements
        </p>
        <SidebarElementList formElement={FormElements.TitleField} />
        <SidebarElementList formElement={FormElements.SubTitleField} />
        <SidebarElementList formElement={FormElements.ParagraphField} />
        <SidebarElementList formElement={FormElements.SeparatorField} />
        <SidebarElementList formElement={FormElements.SpacerField} />
        <p className="text-muted-foreground text-sm col-span-1 md:col-span-2 my-1 w-full place-self-start">
          Form Elements
        </p>
        <SidebarElementList formElement={FormElements.TextField} />
        <SidebarElementList formElement={FormElements.NumberField} />
        <SidebarElementList formElement={FormElements.TextAreaField} />
        <SidebarElementList formElement={FormElements.DateField} />
        <SidebarElementList formElement={FormElements.SelectField} />
      </div>
    </div>
  );
};

export default FormElementSidebar;
