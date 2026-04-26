"use client";
import { usePathname } from "next/navigation";

export default function HeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFormPage =
    pathname === "/food/new" || /^\/food\/[^/]+\/edit$/.test(pathname);

  if (isFormPage) return null;
  return <>{children}</>;
}