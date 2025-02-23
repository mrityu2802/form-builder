import React from "react";
import { getFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const form = await getFormById(id);
  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
};

export default page;
