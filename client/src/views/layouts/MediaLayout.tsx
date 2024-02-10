import React from "react";

export interface MediaLayoutProps {
  children: React.ReactNode;
}

export default function MediaLayout({ children }: MediaLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-full bg-orange-300">teste</div>
      {children}
    </div>
  );
}
