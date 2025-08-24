import * as React$1 from 'react';

type ATTR_SLOT_NAME = "parent-slot";
declare const ATTR_SLOT_NAME_LITERAL: "parent-slot";
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
    /** Object with named slots. */
    slots: NamedSlotsMap<T extends string ? T : never> & {
        default?: React.ReactNode[];
    };
    /** Return requested children slot by name or fallback. */
    get: (name: T | "default", fallback?: React.ReactNode) => React.ReactNode;
    /** Return if slot exist. */
    has: (name: T | "default") => boolean;
    /** Return list of slots. */
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
