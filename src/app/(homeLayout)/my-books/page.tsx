import CenterComponent from "@/components/CenterComponent";
import CreateBook from "@/components/CreateBook";
import { Library } from "lucide-react";
import React from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <>
      <CenterComponent>
        <div className="flex justify-center flex-col gap-3  items-center">
          <Library className=" opacity-50 scale-200" />
          <p className="opacity-50">You haven't posted any books yet</p>

          <CreateBook />
        </div>
      </CenterComponent>
    </>
  );
}

export default Page;
