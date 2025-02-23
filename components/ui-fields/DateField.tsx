"use client";
import { Calendar1 } from "lucide-react";
import {
  ElementType,
  FormElement,
  FormElementInstance,
  FormElementSubmitValue,
} from "../FormElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useDesigner from "@/hooks/useDesigner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
const type: ElementType = "DateField";

const extraAttributes = {
  label: "Date Field",
  helperText: "Pick a date",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(20),
  helperText: z.string().max(100),
  required: z.boolean().default(false),
});

export const DateFieldFormElement: FormElement = {
  type,
  designerComponent: DateFieldDesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currenValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes?.required) {
      return currenValue.length > 0;
    }
    return true;
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: Calendar1,
    label: "Date Field",
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DateFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal"
      >
        <Calendar1 className="w-4 h-4 mr-2" />
        <span>Pick a date</span>
      </Button>
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesigner();
  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;

  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: label,
      helperText: helperText,
      required: required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const onSubmit = (values: z.infer<typeof propertiesSchema>) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  };

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the label of the text field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the helper text of the text field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  This is the required of the text field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValues,
}: {
  elementInstance: FormElementInstance;
  submitValue?: FormElementSubmitValue;
  isInvalid?: boolean;
  defaultValues?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [date, setDate] = useState<Date | undefined>(
    defaultValues ? new Date(defaultValues) : undefined
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full mb-2">
      <Label className={cn(error && "text-destructive")}>
        {label}
        {required && "*"}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "text-destructive"
            )}
          >
            <Calendar1 className="w-4 h-4 mr-2" />
            {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              if (!submitValue) return;
              const value = date?.toUTCString() || "";
              const valid = DateFieldFormElement.validate(element, value);
              setError(!valid);
              if (!valid) return;
              submitValue(element.id, value);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {helperText && (
        <p
          className={cn(
            error && "text-destructive",
            "text-sm text-muted-foreground"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
