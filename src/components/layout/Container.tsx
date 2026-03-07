import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  narrow?: boolean;
  wide?: boolean;
  className?: string;
}

export function Container({ children, narrow, wide, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-8 ${
        narrow ? "max-w-[720px]" : wide ? "max-w-[1320px]" : "max-w-[1200px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
