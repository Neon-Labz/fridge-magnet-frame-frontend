import type { ReactNode } from "react";
import React from 'react';
import WebsiteLayoutShell from "@/components/website/WebsiteLayoutShell";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <WebsiteLayoutShell>{children}</WebsiteLayoutShell>
  );
}