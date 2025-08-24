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

export type hookOptions = {
    forcedAllSlots: boolean
}