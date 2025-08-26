export type ATTR_SLOT_NAME = "parent-slot"
export const ATTR_SLOT_NAME_LITERAL = "parent-slot" as const

type Slot = string | [string, ] 

export type TemplateSlotProps<T> = {
    children: (data?: T extends Record<string, any> ? T : any) => React.ReactNode;
    /* props?: Record<string, any>; */
    [ATTR_SLOT_NAME_LITERAL]: string;
};

export type TemplateSlotPropsChildren<T> = TemplateSlotProps<T extends Record<string, any> ? T : any>['children']

export type SlotNameProp = {
    /** Perfer: <Child slot="header" /> (similar to Web Components) */
    slot?: string;
    /** Other alternatives */
    [ATTR_SLOT_NAME_LITERAL]?: ATTR_SLOT_NAME;
};

export type SlotWithParameters = <T>(data?: T) => ReturnType<TemplateSlotPropsChildren<T>>

/** slots maps: last of nodes names based on hook generic T .*/
export type NamedSlotsMap<T extends string> = Partial<
    Record<T | "default", (React.ReactNode[] | SlotWithParameters)>
> & { default: React.ReactNode[] | SlotWithParameters };

export type UseSlotsResult<T> = {
    /** Object with named slots. */
    slots: NamedSlotsMap<T extends string ? T : never>;
    /** Return requested children slot by name or fallback. */
    get: (name: T | "default", fallback?: React.ReactNode) => React.ReactNode | React.ReactNode[] | SlotWithParameters;
    /** Return if slot exist. */
    has: (name: T | "default") => boolean;
    /** Return list of slots. */
    list: (name: T | "default") => React.ReactNode[] | SlotWithParameters;
};

export type hookOptions = {
    forcedAllSlots: boolean
}