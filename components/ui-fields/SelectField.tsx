"use client";
import { ChevronDown, Trash } from "lucide-react";
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
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
const type: ElementType = "SelectField";

const extraAttributes = {
  label: "Select Field",
  helperText: "Helper Text",
  placeholder: "Placeholder",
  required: false,
  options: [],
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(20),
  helperText: z.string().max(100),
  placeholder: z.string().min(1).max(50),
  required: z.boolean().default(false),
  options: z.array(z.string()).default([]),
});

export const SelectFieldFormElement: FormElement = {
  type,
  designerComponent: SelectFieldDesignerComponent,
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
    icon: ChevronDown,
    label: "Select Field",
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function SelectFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, placeholder, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
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
  const { updateElement, setSelectedElement } = useDesigner();
  const element = elementInstance as CustomInstance;
  const { label, helperText, placeholder, required, options } =
    element.extraAttributes;

  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: label,
      helperText: helperText,
      placeholder: placeholder,
      required: required,
      options: options,
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
    toast.success("Property saved successfully");
    setSelectedElement(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
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
                This is the placeholder of the text field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Options</FormLabel>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    const newOption = `Option ${field.value.length + 1}`;
                    form.setValue("options", field.value.concat(newOption));
                  }}
                >
                  <Plus />
                  Add Option
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-1"
                  >
                    <Input
                      placeholder=""
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        field.value.splice(index, 1);
                        field.onChange(field.value);
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
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
        <Separator />
        <Button className="w-full" type="submit">
          Save
        </Button>
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
  const [value, setValue] = useState(defaultValues || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
    setValue(defaultValues || "");
  }, [isInvalid, defaultValues]);

  const { label, helperText, placeholder, required, options } =
    element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full mb-2">
      <Label className={cn(error && "text-destructive")}>
        {label}
        {required && "*"}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className={cn("w-full", error && "border-destructive")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
