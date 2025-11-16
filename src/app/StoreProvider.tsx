"use client";

import { makeStore, type AppStore } from "@/store/store";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { ManageLocalStorage } from "@/util/managingTheLocalStorage";
import { hydrateCart } from "@/store/features/cartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const localStorageInstance = ManageLocalStorage.ReturnInstance();
    const savedBooks = localStorageInstance.getBooks();

    storeRef.current!.dispatch(hydrateCart(savedBooks));
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
