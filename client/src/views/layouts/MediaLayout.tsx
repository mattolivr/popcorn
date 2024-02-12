import React from "react";

export interface MediaLayoutProps {
  highlight: React.ReactNode;
  children: React.ReactNode;
}

export default function MediaLayout(props: MediaLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col">
      {props.highlight}
      {props.children}
    </div>
  );
}
