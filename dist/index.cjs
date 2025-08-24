'use strict';

var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

// src/useSlots.tsx

// src/types.ts
var ATTR_SLOT_NAME_LITERAL = "parent-slot";

// src/useSlots.tsx
function useSlots(children, options = { forcedAllSlots: false }) {
  if (!children) {
    throw new Error("react-slot-tools: required children parameter is missing");
  }
  const slots = React__namespace.useMemo(() => {
    const out = { default: [] };
    const slotsAsArray = React__namespace.Children.toArray(
      children
    );
    for (const slotChild of slotsAsArray) {
      if (React__namespace.isValidElement(slotChild)) {
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
  const get = React__namespace.useCallback(
    (name, fallback) => {
      const list2 = slots[name];
      if (list2 && list2.length) {
        return list2;
      }
      return fallback ?? null;
    },
    [slots]
  );
  const has = React__namespace.useCallback(
    (name) => {
      const list2 = slots[name];
      return !!(list2 && list2.length);
    },
    [slots]
  );
  const list = React__namespace.useCallback(
    (name) => {
      return slots[name] ?? [];
    },
    [slots]
  );
  return { slots, get, has, list };
}

exports.useSlots = useSlots;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map