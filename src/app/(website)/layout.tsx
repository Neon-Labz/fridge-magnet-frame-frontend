import React from 'react';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {children}
    </div>
  );
}
