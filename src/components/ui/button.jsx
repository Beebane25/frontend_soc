import * as React from "react";

export function Button({ children, variant = "default", className, ...props }) {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`rounded-xl px-4 py-2 text-sm font-medium shadow ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
