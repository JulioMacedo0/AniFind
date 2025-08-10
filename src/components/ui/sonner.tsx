"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      toastOptions={{
        style: {
          background: "hsl(215 28% 17%)",
          border: "1px solid hsl(215 15% 30%)",
          color: "hsl(210 40% 98%)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)",
        },
        className: "backdrop-blur-md border-slate-700/50",
        classNames: {
          description: "!text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
