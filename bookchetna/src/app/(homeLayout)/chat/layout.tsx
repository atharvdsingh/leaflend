import { SocketProvider } from "@/components/providers/ChatContextProvider";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <SocketProvider>{children}</SocketProvider>
    </div>
  );
}
