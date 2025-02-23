"use client";

import { FormElementInstance } from "../FormElements";
import { createContext, SetStateAction, Dispatch, useState } from "react";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  deleteElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  updateElement: (id: string, element: FormElementInstance) => void;
  setFormElements: (elements: FormElementInstance[]) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => [
      ...prev.slice(0, index),
      element,
      ...prev.slice(index),
    ]);
  };
  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };
  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => prev.map((e) => (e.id === id ? element : e)));
  };
  const setFormElements = (elements: FormElementInstance[]) => {
    setElements(elements);
  };
  return (
    <DesignerContext.Provider
      value={{
        elements: elements,
        addElement: addElement,
        deleteElement: deleteElement,
        selectedElement: selectedElement,
        setSelectedElement: setSelectedElement,
        updateElement: updateElement,
        setFormElements: setFormElements,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
