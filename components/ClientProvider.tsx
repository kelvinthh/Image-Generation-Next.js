"use client";

import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="bottom-center" />
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
}
