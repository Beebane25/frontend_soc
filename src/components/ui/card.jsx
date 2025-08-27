import * as React from "react";

export function Card({ children, className }) {
  return (
    <div className={`rounded-2xl border bg-white p-4 shadow ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={`mb-2 font-bold text-lg ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={`${className}`}>{children}</div>;
}
