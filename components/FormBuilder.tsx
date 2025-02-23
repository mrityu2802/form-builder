"use client";

import { Form } from "@prisma/client";
import PreviewDialog from "./PreviewDialog";
import PublishForm from "./PublishForm";
import SaveForm from "./SaveForm";
import DesignBoard from "./DesignBoard";
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "@/hooks/useDesigner";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import DeleteBtn from "./DeleteBtn";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "./ui/separator";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setFormElements, setSelectedElement } = useDesigner();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  useEffect(() => {
    const elements = JSON.parse(form.content);
    setFormElements(elements);
    setSelectedElement(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, setSelectedElement]);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/dashboard/form/${form.id}`
      : "";
  if (form.published) {
    return (
      <div className="flex flex-col items-center p-10 h-full w-full">
        <div className="min-w-[500px] border-2 border-dashed  shadow-md rounded-md p-4">
          <h1 className="text-4xl font-bold w-full text-center text-primary border-b mb-4">
            Form Published
          </h1>
          <h2 className="text-xl text-muted-foreground border-b pb-4">
            Share the form
          </h2>
          <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
            <Input className="w-full" value={url} readOnly />
            <Button
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Copied to clipboard");
              }}
            >
              Copy
            </Button>
          </div>
          <div className="flex justify-between w-full">
            <Button variant="link" className="p-0" asChild>
              <Link href={"/"}>
                <ArrowLeftIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>
            <Button variant="link" className="p-0" asChild>
              <Link href={`/dashboard/form/${form.id}`}>
                Form details
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col gap-1 w-full">
        <nav className="flex flex-col sm:flex-row gap-2 w-full sm:items-center sm:justify-between border-b-2 py-2">
          <Breadcrumb className="mt-2 ">
            <BreadcrumbList className="flex flex-nowrap text-nowrap gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink href={"/dashboard"}>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={`/dashboard/build/${form.id}`}>
                  <h2 className="text-2xl font-bold">
                    <span className="text-muted-foreground mr-2">
                      {form.name}
                    </span>
                  </h2>
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Separator className="block sm:hidden" />

          <div className="flex items-center gap-4 overflow-x-auto">
            <PreviewDialog />
            <DeleteBtn id={form.id} title="Delete" />
            {!form.published && (
              <>
                <SaveForm id={form.id} />
                <PublishForm id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/graph-paper.svg)]">
          <DesignBoard />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
