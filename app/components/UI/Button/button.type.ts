import type { ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: "solid" | "outline";
  color?: string;
  colorText?: string;
  className?: string;
  onClick?: () => void;
};
