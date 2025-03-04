import CreateForm from "@/components/CreateForm";
import { Suspense } from "react";
import FormSkeleton from "@/components/FormSkeleton";
import FormCards from "@/components/FormCards";

export default function Home() {
  return (
    <div className="pt-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateForm />
        <Suspense fallback={<FormSkeleton />}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
