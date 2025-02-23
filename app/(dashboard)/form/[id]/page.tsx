import React, { ReactNode } from "react";
import { getFormById, getSubmissionsByFormId } from "@/actions/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLinkIcon, EyeIcon, FileIcon } from "lucide-react";
import CopyWidget from "@/components/CopyWidget";
import { ElementType, FormElementInstance } from "@/components/FormElements";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import DeleteBtn from "@/components/DeleteBtn";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const form = await getFormById(id);
  const { views, submissions } = form;

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex w-full items-center justify-between border-b-2 py-2">
        <Button
          variant="link"
          className="text-muted-foreground hover:text-[#fca5a5] "
          asChild
        >
          <Link href={`/submit/${form.id}`} target="_blank">
            <span className="text-3xl truncate font-bold">{form.name}</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="flex items-center gap-2">
              <EyeIcon className="w-4 h-4" />
              {views.toLocaleString()}
            </span>
            •
            <span className="flex items-center gap-2">
              <FileIcon className="w-4 h-4" />
              {submissions.toLocaleString()}
            </span>
          </span>
          <DeleteBtn id={id} />
        </div>
      </div>
      <div className="flex w-full items-center border-b p-4 gap-4">
        <span className="font-bold text-sm">Description:</span>
        <p className="text-muted-foreground text-sm">
          {form.description || "No description"}
        </p>
      </div>
      <CopyWidget form={form} />
      <div className="container mx-auto">
        <SubmissionTable id={id} />
      </div>
    </div>
  );
};

export default page;

type Row = {
  [key: string]: string;
} & { submittedAt: Date };

async function SubmissionTable({ id }: { id: string }) {
  const form = await getSubmissionsByFormId(id);
  console.log(form);
  if (!form) {
    return <div>No submissions found</div>;
  }
  const FormElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementType;
  }[] = [];

  const rows: Row[] = [];

  FormElements.forEach((element) => {
    switch (element.type) {
      case "SpacerField":
      case "SeparatorField":
        break;
      case "TextField":
      case "SelectField":
      case "TitleField":
      case "SubTitleField":
      case "ParagraphField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
        if (element.extraAttributes?.label) {
          columns.push({
            id: element.id,
            label: element.extraAttributes.label as string,
            required: element.extraAttributes?.required as boolean,
            type: element.type as ElementType,
          });
        }
        break;
      default:
        break;
    }
  });

  form.FormSubmission.forEach((submission) => {
    const row: Row = JSON.parse(submission.submissionData);
    row.submittedAt = submission.createdAt;
    rows.push(row);
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className="uppercase bg-muted border-r"
                >
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase bg-muted">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.submittedAt.toISOString()}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementType; value: string }) {
  const displayValue = value || "-";

  let node: ReactNode = displayValue;
  switch (type) {
    case "TextField":
    case "SelectField":
    case "TitleField":
    case "SubTitleField":
    case "ParagraphField":
    case "NumberField":
    case "TextAreaField":
    case "DateField":
      node = <span className="text-muted-foreground">{displayValue}</span>;
      break;
    default:
      break;
  }
  return <TableCell className="border-r">{node}</TableCell>;
}
