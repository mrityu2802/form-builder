"use client";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { submitFormToDatabase } from "@/actions/form";
const FormSubmitComponent = ({
  id,
  content,
}: {
  id: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const isValid = validateForm();
    if (!isValid) {
      setRenderKey(new Date().getTime());
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const jsonData = JSON.stringify(formValues.current);
      await submitFormToDatabase(id, jsonData);
      setSubmitted(true);
      toast.success("Form submitted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[700px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-sm rounded">
          <h1 className="text-2xl font-bold">Form submitted successfully</h1>
          <Button
            variant="outline"
            onClick={() => {
              formValues.current = {};
              formErrors.current = {};
              setSubmitted(false);
              setRenderKey(new Date().getTime());
            }}
          >
            Submit another response
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[700px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-sm shadow-red-300 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValues={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-4"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader className="w-4 h-4 ml-2 animate-spin" />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
