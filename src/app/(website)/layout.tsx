import type { ReactNode } from "react";
import React from "react";
import WebsiteLayoutShell from "@/components/website/WebsiteLayoutShell";
import ToasterProvider from "@/components/website/ToasterProvider";

/**
 * Website layout — Server Component.
 *
 * <ToasterProvider> is a 'use client' wrapper around react-hot-toast's
 * <Toaster>. Importing the library directly here (without the wrapper)
 * caused a "Module not found: Can't resolve 'react-hot-toast'" error
 * because Next.js App Router Server Components cannot bundle client-only
 * packages into the server/RSC bundle.
 */
export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <WebsiteLayoutShell>
      <ToasterProvider />
      <main>{children}</main>
    </WebsiteLayoutShell>
  );
}