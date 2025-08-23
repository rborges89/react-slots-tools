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
 * Hook para extraer "slots" desde children por nombre.
 * Reconoce props: slot, slotName y "slot-name".
 * Todo child sin nombre cae en el slot 'default'.
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

    return out;
  }, [children]);

  const get = React.useCallback(
    (name: string, fallback?: React.ReactNode) => {
      const list = slots[name as T];

      if (list && list.length) {
        return list;
      }

      return fallback ?? null;
    },
    [slots]
  );

  const has = React.useCallback(
    (name: string) => {
      const list = slots[name as T];
      return !!(list && list.length);
    },
    [slots]
  );

  const list = React.useCallback(
    (name: string) => {
      return (slots[name as T] ?? []) as React.ReactNode[];
    },
    [slots]
  );

  return { slots, get, has, list };
}
