import { cn, generateId } from "@/lib/utils";
import DesignToolBar from "./DesignToolBar";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import useDesigner from "@/hooks/useDesigner";
import { DragEndEvent } from "@dnd-kit/core";
import { FormElementInstance } from "./FormElements";
import { ElementType, FormElements } from "./FormElements";
import { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const DesignBoard = () => {
  const { elements, addElement, setSelectedElement, deleteElement } =
    useDesigner();
  const droppable = useDroppable({
    id: "design-board",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
      const isDesignerDropArea = over.data.current?.isDesignerDropArea;

      // if the element is a designer button element and the drop area is a designer drop area, add the element
      if (isDesignerBtnElement && isDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          generateId()
        );
        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverElement =
        over.data.current?.isTopElement | over.data.current?.isBottomElement;
      // if the element is a designer button element and the drop area is a designer drop area, add the element
      if (isDesignerBtnElement && isDroppingOverElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          generateId()
        );
        const elementIndex = elements.findIndex(
          (element) => element.id === over.data.current?.elementId
        );
        if (elementIndex === -1) return; // if the element is not found, return
        let index = elementIndex;
        if (over.data.current?.isBottomElement) {
          index++;
        }
        addElement(index, newElement);
        return;
      }

      const isDraggingOverElement = active.data.current?.isDesignerElement;
      const draggingOneElementOverAnother =
        isDroppingOverElement && isDraggingOverElement;

      if (draggingOneElementOverAnother) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data.current?.elementId;
        const activeIndex = elements.findIndex(
          (element) => element.id === activeId
        );
        const overIndex = elements.findIndex(
          (element) => element.id === overId
        );
        if (activeIndex === -1 || overIndex === -1) return; // if the element is not found, return
        const activeElement = { ...elements[activeIndex] };
        deleteElement(activeElement.id);
        let index = overIndex;
        if (over.data.current?.isBottomElement) {
          index = overIndex + 1;
        }
        addElement(index, activeElement);
        return;
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <DesignToolBar />
      <div className="p-4 w-full" onClick={() => setSelectedElement(null)}>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full mx-auto rounded-lg flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] w-full bg-primary/20 rounded-md"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col gap-2 w-full p-4">
              {elements.map((element) => (
                <ElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignBoard;

function ElementWrapper({ element }: { element: FormElementInstance }) {
  const { deleteElement, setSelectedElement } = useDesigner();
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const top = useDroppable({
    id: `top-${element.id}`,
    data: {
      type: element.type,
      elementId: element.id,
      isTopElement: true,
    },
  });

  const bottom = useDroppable({
    id: `bottom-${element.id}`,
    data: {
      type: element.type,
      elementId: element.id,
      isBottomElement: true,
    },
  });

  const DesignerElement = FormElements[element.type].designerComponent;
  const draggable = useDraggable({
    id: element.id + "-draggable",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) {
    return null;
  }

  return (
    <div
      className="relative h-[150px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={top.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottom.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-t-md"
      ></div>
      {mouseOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none !bg-red-500 z-10"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(element.id);
              }}
            >
              <Trash className="size-6 text-white" />
            </Button>
          </div>
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {top.isOver && (
        <div className="absolute top-0 w-full h-2 rounded-t-md bg-foreground/20"></div>
      )}
      <div
        ref={top.setNodeRef}
        className={cn(
          "flex w-full h-[150px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottom.isOver && (
        <div className="absolute bottom-0 w-full h-2 rounded-b-md bg-foreground/20"></div>
      )}
    </div>
  );
}
