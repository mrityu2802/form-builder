import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarElementDragOverlay } from "./SidebarElementList";
import { FormElements, ElementType } from "./FormElements";
import useDesigner from "@/hooks/useDesigner";

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedElement, setDraggedElement] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedElement(event.active);
    },
    onDragCancel: () => {
      setDraggedElement(null);
    },
  });
  if (!draggedElement) return null;
  let node = (
    <div className="text-sm text-muted-foreground">No drag overlay</div>
  );
  const isSideBarBtnElement =
    draggedElement?.data.current?.isDesignerBtnElement;

  if (isSideBarBtnElement) {
    const type = draggedElement.data.current?.type as ElementType;
    node = <SidebarElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedElement.data.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedElement.data.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    if (!element) node = <div>Element not found</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
