import * as React from "react";
import {
  ATTR_SLOT_NAME_LITERAL,
  SlotNameProp,
  TemplateSlotPropsChildren,
  SlotWithParameters,
  NamedSlotsMap,
  UseSlotsResult,
  hookOptions,
} from "./types";
import { TemplateSlot } from "./TemplateSlot";

/**
 * Function to search and return node slot name.
 * Recognizes props: slot and "slot-name".
 */
function getNodeName(element: React.ReactNode): string | null {
  if (React.isValidElement(element)) {
    const props = (element.props ?? {}) as SlotNameProp &
      Record<string, unknown>;

    const name = (props.slot ?? (props as any)[ATTR_SLOT_NAME_LITERAL]) as
      | string
      | null;

    return (name && String(name).trim()) || "default";
  }

  return null;
}

/**
 * Function to search and return node type.
 * Node type can be an especial library TempateSlot Component type (if you need use slots with parameters)
 * or any other type of element
 */
function getNodeType(element: React.ReactNode): any {
  if (React.isValidElement(element)) {
    return element.type;
  }

  return null;
}

/**
 * Hook for extract "slots" from children special prop.
 * Recognizes props: slot and "slot-name".
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
      let templateSlotChildren: TemplateSlotPropsChildren<any> | null = null;

      let nodeToPush:
        | SlotWithParameters
        | React.ReactNode[]
        | React.ReactNode
        | null = null;

      if (React.isValidElement(slotChild)) {
        /* search slot name */
        const slotKey = getNodeName(slotChild) as T | "default";

        const SlotType = getNodeType(slotChild);

        if (SlotType == TemplateSlot) {
          //is function children
          templateSlotChildren = slotChild?.props?.children;

          if (!templateSlotChildren) {
            throw new Error(
              "react-slot-tools: required children parameter is missing to create <TemplateSlot> component"
            );
          }
        }

        if (
          templateSlotChildren &&
          typeof templateSlotChildren === "function"
        ) {
          type Fn = typeof templateSlotChildren;
          type Args = Parameters<Fn>[0];

          nodeToPush = (params?: Args) =>
            (templateSlotChildren as SlotWithParameters)(params);
        } else {
          nodeToPush = slotChild as React.ReactNode;
        }

        if (!out[slotKey]) {
          if (!templateSlotChildren) {
            (out[slotKey as T] as any) = [nodeToPush];
          } else {
            (out[slotKey as T] as any) = nodeToPush;
          }
        } else {
          if (!templateSlotChildren) {
            (out[slotKey as T] as any).push(nodeToPush);
          } else {
            (out[slotKey as T] as any) = nodeToPush;
          }
        }
      } else {
        if (!out.default) {
          out.default = [];
        }

        (out.default as React.ReactNode[]).push(slotChild);
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
