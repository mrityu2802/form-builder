import { getFormContent } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

const SubmitPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const form = await getFormContent(id);
  if (!form) {
    return <div>Form not found</div>;
  }
  const content = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent id={id} content={content} />;
};

export default SubmitPage;
