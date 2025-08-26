'use strict';

var jsxRuntime = require('react/jsx-runtime');
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

// src/TemplateSlot.tsx
var TemplateSlot = ({
  children
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
};

// src/types.ts
var ATTR_SLOT_NAME_LITERAL = "parent-slot";

// src/useSlots.tsx
function getNodeName(element) {
  if (React__namespace.isValidElement(element)) {
    const props = element.props ?? {};
    const name = props.slot ?? props[ATTR_SLOT_NAME_LITERAL];
    return name && String(name).trim() || "default";
  }
  return null;
}
function getNodeType(element) {
  if (React__namespace.isValidElement(element)) {
    return element.type;
  }
  return null;
}
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
      let templateSlotChildren = null;
      let nodeToPush = null;
      if (React__namespace.isValidElement(slotChild)) {
        const slotKey = getNodeName(slotChild);
        const SlotType = getNodeType(slotChild);
        if (SlotType == TemplateSlot) {
          templateSlotChildren = slotChild?.props?.children;
          if (!templateSlotChildren) {
            throw new Error(
              "react-slot-tools: required children parameter is missing to create <TemplateSlot> component"
            );
          }
        }
        if (templateSlotChildren && typeof templateSlotChildren === "function") {
          nodeToPush = (params) => templateSlotChildren(params);
        } else {
          nodeToPush = slotChild;
        }
        if (!out[slotKey]) {
          if (!templateSlotChildren) {
            out[slotKey] = [nodeToPush];
          } else {
            out[slotKey] = nodeToPush;
          }
        } else {
          if (!templateSlotChildren) {
            out[slotKey].push(nodeToPush);
          } else {
            out[slotKey] = nodeToPush;
          }
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

exports.TemplateSlot = TemplateSlot;
exports.useSlots = useSlots;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map