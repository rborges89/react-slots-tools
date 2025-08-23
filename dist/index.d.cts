import * as React$1 from 'react';

type ATTR_SLOT_NAME = "slot-parent";
declare const ATTR_SLOT_NAME_LITERAL: "slot-parent";
type SlotNameProp = {
    /** Perfer: <Child slot="header" /> (similar to Web Components) */
    slot?: string;
    /** Other alternatives */
    slotName?: string;
    [ATTR_SLOT_NAME_LITERAL]?: ATTR_SLOT_NAME;
};
/** slots maps: last of nodes names based on hook generic T .*/
type NamedSlotsMap<T extends string> = Partial<Record<T | "default", React.ReactNode[]>> & {
    default: React.ReactNode[];
};
type UseSlotsResult<T> = {
    /** Objeto con todos los slots nombrados y el default. */
    slots: NamedSlotsMap<T extends string ? T : never> & {
        default?: React.ReactNode[];
    };
    /** Devuelve los children del slot solicitado o un fallback. */
    get: (name: T | "default", fallback?: React.ReactNode) => React.ReactNode;
    /** Indica si existe contenido para el slot. */
    has: (name: T | "default") => boolean;
    /** Devuelve el array puro de un slot (útil si necesitas mapear). */
    list: (name: T | "default") => React.ReactNode[];
};
type hookOptions = {
    forcedAllSlots: boolean;
};

/**
 * Hook for extract "slots" from children special prop.
 * Recognizes props: slot, slotName and "slot-name".
 * All child without name belongs 'default' slot.
 */
declare function useSlots<T extends string>(children: React$1.ReactNode, options?: hookOptions): UseSlotsResult<T>;

export { type NamedSlotsMap, type SlotNameProp, type UseSlotsResult, useSlots };
