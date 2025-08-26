import { FC } from "react";
import { TemplateSlotProps } from "./types";

export const TemplateSlot = <T extends Record<string, any>>({
  children,
}: TemplateSlotProps<T>) => {
  return <>{children}</>;
};
