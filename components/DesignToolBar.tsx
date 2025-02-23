import React from "react";
import useDesigner from "@/hooks/useDesigner";
import FormElementSidebar from "./FormElementSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

const DesignToolBar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-2 rounded-r-lg border-muted p-4 bg-background overflow-y-auto h-full shadow-lg">
      {!selectedElement && <FormElementSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignToolBar;
