import * as React from "react";
import {
  ATTR_SLOT_NAME,
  ATTR_SLOT_NAME_LITERAL,
  SlotNameProp,
  NamedSlotsMap,
  UseSlotsResult,
  hookOptions,
} from "./types";

/**
 * Hook for extract "slots" from children special prop.
 * Recognizes props: slot, slotName and "slot-name".
 * All child without name belongs 'default' slot.
 */
export function useSlots<T extends string>(
  children: React.ReactNode,
  options: hookOptions = { forcedAllSlots: false }
): UseSlotsResult<T> {
  if (!children) {
    throw new Error("react-slot-tools: required children parameter is missing");
  }

  const slots = React.useMemo<NamedSlotsMap<T>>(() => {
    const out: NamedSlotsMap<T> = { default: [] } as NamedSlotsMap<T>;

    const slotsAsArray: React.ReactNode = React.Children.toArray(
      children
    ) as Array<React.ReactNode>;

    for (const slotChild of slotsAsArray) {
      // Si es un elemento React, puede traer props con el nombre del slot
      if (React.isValidElement(slotChild)) {
        const props = (slotChild.props ?? {}) as SlotNameProp &
          Record<string, unknown>;

        /* Buscando el nombre del slot, puede ser la propiedad slot-name sino es default */
        const name = (props.slot ??
          props.slotName ??
          (props as any)[ATTR_SLOT_NAME_LITERAL]) as string | undefined;

        const slotKey = ((name && String(name).trim()) || "default") as
          | T
          | "default";

        if (!out[slotKey]) {
          (out[slotKey as T] as React.ReactNode[]) = [
            slotChild as React.ReactNode,
          ];
        } else {
          (out[slotKey as T] as React.ReactNode[]).push(slotChild);
        }
      } else {
        // string | number | etc: lo consideramos contenido del default
        if (!out.default) {
          out.default = [];
        }

        out.default.push(slotChild);
      }
    }

    /* if (options.forcedAllSlots) {
      const keysExceptDefault = Object.keys(out).filter((k) => k !== "default");
    } */

    return out;
  }, [children]);

  const get = React.useCallback(
    (name: T | "default", fallback?: React.ReactNode) => {
      const list = slots[name as T];

      if (list && list.length) {
        return list;
      }

      return fallback ?? null;
    },
    [slots]
  );

  const has = React.useCallback(
    (name: T | "default") => {
      const list = slots[name as T];
      return !!(list && list.length);
    },
    [slots]
  );

  const list = React.useCallback(
    (name: T | "default") => {
      return (slots[name as T] ?? []) as React.ReactNode[];
    },
    [slots]
  );

  return { slots, get, has, list };
}
