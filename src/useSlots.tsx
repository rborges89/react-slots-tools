import * as React from "react";

/** Props admitidos para nombrar un slot en un child. */
export type SlotNameProp = {
  /** Preferido: <Child slot="header" /> (similar a Web Components) */
  slot?: string;
  /** Alternativas soportadas para DX */
  slotName?: string;
  ["slot-name"]?: string;
};

/** Mapa de slots: nombre -> lista de nodos (soporta varios elementos por slot). */
export type NamedSlotsMap = {
  default?: React.ReactNode[];
  [name: string]: React.ReactNode[] | undefined;
};

export type UseSlotsResult = {
  /** Objeto con todos los slots nombrados y el default. */
  slots: NamedSlotsMap;
  /** Devuelve los children del slot solicitado o un fallback. */
  get: (name: string, fallback?: React.ReactNode) => React.ReactNode;
  /** Indica si existe contenido para el slot. */
  has: (name: string) => boolean;
  /** Devuelve el array puro de un slot (útil si necesitas mapear). */
  list: (name: string) => React.ReactNode[];
};

/**
 * Hook para extraer "slots" desde children por nombre.
 * Reconoce props: slot, slotName y "slot-name".
 * Todo child sin nombre cae en el slot 'default'.
 */
export function useSlots(children: React.ReactNode): UseSlotsResult {
  const slots = React.useMemo<NamedSlotsMap>(() => {
    const out: NamedSlotsMap = { default: [] };
    const arr = React.Children.toArray(children) as React.ReactNode[];

    for (const node of arr) {
      // Si es un elemento React, puede traer props con el nombre del slot
      if (React.isValidElement(node)) {
        const props = (node.props ?? {}) as SlotNameProp & Record<string, unknown>;
        const name = (props.slot ?? props.slotName ?? (props as any)["slot-name"]) as
          | string
          | undefined;

        const key = (name && String(name).trim()) || "default";
        if (!out[key]) out[key] = [];
        (out[key] as React.ReactNode[]).push(node);
      } else {
        // string | number | etc: lo consideramos contenido del default
        if (!out.default) out.default = [];
        out.default.push(node);
      }
    }
    return out;
  }, [children]);

  const get = React.useCallback(
    (name: string, fallback?: React.ReactNode) => {
      const list = slots[name];
      if (list && list.length) return list;
      return fallback ?? null;
    },
    [slots]
  );

  const has = React.useCallback((name: string) => {
    const list = slots[name];
    return !!(list && list.length);
  }, [slots]);

  const list = React.useCallback((name: string) => {
    return (slots[name] ?? []) as React.ReactNode[];
  }, [slots]);

  return { slots, get, has, list };
}
