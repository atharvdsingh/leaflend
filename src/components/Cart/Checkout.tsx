import React from "react";
import { Card } from "../ui/card";

interface Props {}

function Checkout(props: Props) {
  const {} = props;

  return (
    <>
      <div className="flex flex-col p-4 max-w-7xl m-auto border ">
        <Card className="flex flex-col">
          <div className=" flex justify-between items-center ">
            <p>{"items"}</p>
            <p>{"price"}</p>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Checkout;
