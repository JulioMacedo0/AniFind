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
      }}
      style={
        {
          "--normal-bg": "hsl(215 28% 17%)", // slate-800
          "--normal-text": "hsl(210 40% 98%)", // slate-50
          "--normal-border": "hsl(215 15% 30%)", // slate-700
          "--success-bg": "hsl(195 100% 30%)", // cyan-700
          "--success-text": "hsl(180 100% 90%)", // cyan-100
          "--error-bg": "hsl(0 84% 40%)", // red-600
          "--error-text": "hsl(0 86% 97%)", // red-50
          "--info-bg":
            "linear-gradient(135deg, hsl(221 83% 53%), hsl(262 83% 58%))", // blue-500 to purple-500
          "--info-text": "hsl(210 40% 98%)", // slate-50
          "--warning-bg": "hsl(38 92% 50%)", // amber-500
          "--warning-text": "hsl(45 93% 8%)", // amber-950
          "--loading-bg": "hsl(240 4% 16%)", // gray-900
          "--loading-text": "hsl(0 0% 71%)", // gray-400
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
