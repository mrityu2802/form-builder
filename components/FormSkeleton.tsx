import { Skeleton } from "./ui/skeleton";

export default function FormSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <Skeleton
          key={index}
          className="border-2 border-primary/20 h-[190px] w-full rounded-md"
        />
      ))}
    </>
  );
}
