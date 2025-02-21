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
import { LinkIcon } from "lucide-react";
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
            <Badge>Published</Badge>
          ) : (
            <Badge variant={"destructive"}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          <span>
            {formatDistance(new Date(form.createdAt), new Date(), {
              addSuffix: true,
            })}
          </span>
          {form.published && (
            <span className="flex items-center gap-2">
              •<span>{form.views.toLocaleString()} views</span>•
              <span>{form.submissions.toLocaleString()} submissions</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="truncate h-[20px] text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button variant={"outline"} asChild>
            <Link href={`/form/${form.id}`}>
              View submissions
              <LinkIcon className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
