export type ATTR_SLOT_NAME = "parent-slot"
export const ATTR_SLOT_NAME_LITERAL = "parent-slot" as const

export type SlotNameProp = {
    /** Perfer: <Child slot="header" /> (similar to Web Components) */
    slot?: string;
    /** Other alternatives */
    slotName?: string;
    [ATTR_SLOT_NAME_LITERAL]?: ATTR_SLOT_NAME;
};

/** slots maps: last of nodes names based on hook generic T .*/
export type NamedSlotsMap<T extends string> = Partial<
    Record<T | "default", React.ReactNode[]>
> & { default: React.ReactNode[] };

export type UseSlotsResult<T> = {
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

export type hookOptions = {
    forcedAllSlots: boolean
}