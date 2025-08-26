import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';

type ATTR_SLOT_NAME = "parent-slot";
declare const ATTR_SLOT_NAME_LITERAL: "parent-slot";
type TemplateSlotProps<T> = {
    children: (data?: T extends Record<string, any> ? T : any) => React.ReactNode;
    [ATTR_SLOT_NAME_LITERAL]: string;
};
type TemplateSlotPropsChildren<T> = TemplateSlotProps<T extends Record<string, any> ? T : any>['children'];
type SlotNameProp = {
    /** Perfer: <Child slot="header" /> (similar to Web Components) */
    slot?: string;
    /** Other alternatives */
    [ATTR_SLOT_NAME_LITERAL]?: ATTR_SLOT_NAME;
};
type SlotWithParameters = <T>(data?: T) => ReturnType<TemplateSlotPropsChildren<T>>;
/** slots maps: last of nodes names based on hook generic T .*/
type NamedSlotsMap<T extends string> = Partial<Record<T | "default", (React.ReactNode[] | SlotWithParameters)>> & {
    default: React.ReactNode[] | SlotWithParameters;
};
type UseSlotsResult<T> = {
    /** Object with named slots. */
    slots: NamedSlotsMap<T extends string ? T : never>;
    /** Return requested children slot by name or fallback. */
    get: (name: T | "default", fallback?: React.ReactNode) => React.ReactNode | React.ReactNode[] | SlotWithParameters;
    /** Return if slot exist. */
    has: (name: T | "default") => boolean;
    /** Return list of slots. */
    list: (name: T | "default") => React.ReactNode[] | SlotWithParameters;
};
type hookOptions = {
    forcedAllSlots: boolean;
};

declare const TemplateSlot: <T extends Record<string, any>>({ children, }: TemplateSlotProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Hook for extract "slots" from children special prop.
 * Recognizes props: slot and "slot-name".
 * All child without name belongs 'default' slot.
 */
declare function useSlots<T extends string>(children: React$1.ReactNode, options?: hookOptions): UseSlotsResult<T>;

export { type NamedSlotsMap, type SlotNameProp, type SlotWithParameters, TemplateSlot, type UseSlotsResult, useSlots };
