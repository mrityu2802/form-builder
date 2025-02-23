import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight, PencilIcon } from "lucide-react";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Form } from "@prisma/client";

export default function FormCard({ form }: { form: Form }) {
  return (
    <Card key={form.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge className="!bg-green-500 text-white">Published</Badge>
          ) : (
            <Badge variant={"destructive"}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          <span
            className="truncate"
            title={formatDistance(new Date(form.createdAt), new Date(), {
              addSuffix: true,
            })}
          >
            {formatDistance(new Date(form.createdAt), new Date(), {
              addSuffix: true,
            })}
          </span>
          {form.published && (
            <span className="flex items-center gap-2">
              •
              <span
                className="tabular-nums truncate"
                title={`${form.views.toLocaleString()} views`}
              >
                {form.views.toLocaleString()} views
              </span>
              •
              <span
                className="tabular-nums truncate"
                title={`${form.submissions.toLocaleString()} submissions`}
              >
                {form.submissions.toLocaleString()} submissions
              </span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="truncate h-[20px] text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button className="w-full mt-2 text-sm gap-4" asChild>
            <Link href={`/form/${form.id}`}>
              View submissions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <>
            <Button
              className="w-full mt-2 text-sm gap-4"
              variant={"secondary"}
              asChild
            >
              <Link href={`/build/${form.id}`}>
                Edit form
                <PencilIcon className="w-4 h-4" />
              </Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
