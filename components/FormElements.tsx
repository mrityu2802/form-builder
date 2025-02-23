import { SubTitleFieldFormElement } from "./ui-fields/SubtitleField";
import { TextFieldFormElement } from "./ui-fields/TextField";
import { TitleFieldFormElement } from "./ui-fields/TitleField";
import { ParagraphFieldFormElement } from "./ui-fields/ParagraphField";
import { SeparatorFieldFormElement } from "./ui-fields/SeparatorField";
import { SpacerFieldFormElement } from "./ui-fields/SpacerField";
import { NumberFieldFormElement } from "./ui-fields/NumberField";
import { TextAreaFieldFormElement } from "./ui-fields/TextAreaField";
import { DateFieldFormElement } from "./ui-fields/DateField";
import { SelectFieldFormElement } from "./ui-fields/SelectField";

export type ElementType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField";
export type FormElementSubmitValue = (key: string, value: string) => void;

export type FormElement = {
  type: ElementType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: FormElementSubmitValue;
    isInvalid?: boolean;
    defaultValues?: string;
  }>;
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
  validate: (formElement: FormElementInstance, currenValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementType;
  extraAttributes?: Record<string, unknown>;
};

type FormElementTypes = {
  [key in ElementType]: FormElement;
};

export const FormElements: FormElementTypes = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
};
