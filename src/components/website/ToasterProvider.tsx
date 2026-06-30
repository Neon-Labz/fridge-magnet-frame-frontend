'use client';

/**
 * ToasterProvider — thin client-side wrapper for react-hot-toast's <Toaster>.
 *
 * WHY THIS EXISTS:
 *   Next.js App Router Server Components cannot directly import client-only
 *   packages (those that use browser APIs / React hooks). `react-hot-toast`
 *   is a client-only library, so importing it from a Server Component such as
 *   `(website)/layout.tsx` causes a "Module not found" webpack error at build
 *   time, even though the package is physically installed.
 *
 *   Wrapping it in a component with the `'use client'` directive creates a
 *   proper client-component boundary. The Server Component layout can then
 *   import and render <ToasterProvider /> safely, because Next.js will
 *   evaluate it only in the browser bundle.
 */

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return <Toaster position="top-right" />;
}
