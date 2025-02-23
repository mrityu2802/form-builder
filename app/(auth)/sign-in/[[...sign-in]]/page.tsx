import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default page;
