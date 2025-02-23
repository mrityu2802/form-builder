import React from "react";
import { Loader2 } from "lucide-react";
const loading = () => {
  return (  
    <div className="flex items-center justify-center h-screen w-full">
      <Loader2 className="w-12 h-12 animate-spin" />
    </div>
  );
};

export default loading;
