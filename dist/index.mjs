import * as React from 'react';

// src/useSlots.tsx

// src/types.ts
var ATTR_SLOT_NAME_LITERAL = "parent-slot";

// src/useSlots.tsx
function useSlots(children, options = { forcedAllSlots: false }) {
  if (!children) {
    throw new Error("react-slot-tools: required children parameter is missing");
  }
  const slots = React.useMemo(() => {
    const out = { default: [] };
    const slotsAsArray = React.Children.toArray(
      children
    );
    for (const slotChild of slotsAsArray) {
      if (React.isValidElement(slotChild)) {
        const props = slotChild.props ?? {};
        const name = props.slot ?? props.slotName ?? props[ATTR_SLOT_NAME_LITERAL];
        const slotKey = name && String(name).trim() || "default";
        if (!out[slotKey]) {
          out[slotKey] = [
            slotChild
          ];
        } else {
          out[slotKey].push(slotChild);
        }
      } else {
        if (!out.default) {
          out.default = [];
        }
        out.default.push(slotChild);
      }
    }
    return out;
  }, [children]);
  const get = React.useCallback(
    (name, fallback) => {
      const list2 = slots[name];
      if (list2 && list2.length) {
        return list2;
      }
      return fallback ?? null;
    },
    [slots]
  );
  const has = React.useCallback(
    (name) => {
      const list2 = slots[name];
      return !!(list2 && list2.length);
    },
    [slots]
  );
  const list = React.useCallback(
    (name) => {
      return slots[name] ?? [];
    },
    [slots]
  );
  return { slots, get, has, list };
}

export { useSlots };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map