# @burning89/react-slots-tools

Hook for named slots from react `children` special prop, (similar to Vue/Svelte/Web Components)..

## Install

```bash
npm i @burning89/react-slots-tools
# o
pnpm add @burning89/react-slots-tools
# o
yarn add @burning89/react-slots-tools
```

## Uso rápido

```tsx
import * as React from "react";
import { useSlots } from "@burning89/react-slots-tools";

type AvailableParentSlotsType = "header" | "footer";

function Card({ children }: { children: React.ReactNode }) {
  const { get } = useSlots<AvailableParentSlotsType>(children);
  return (
    <div>
      <header>{get("header", <div>No header</div>)}</header>
      <section>{get("default")}</section>
      <footer>{get("footer")}</footer>
    </div>
  );
}

export default function Demo() {
  return (
    <Card>
      <h1 slot="header">title</h1>
      <p>Default content</p>
      <small slot-name="footer">© 2025</small>
    </Card>
  );
}
```

## API

```ts
function useSlots<T>(children: React.ReactNode): {
  slots: Record<string, React.ReactNode[] | undefined>; // incluye 'default'
  get(name: T | "default", fallback?: React.ReactNode): React.ReactNode; // list of slots or fallback
  has(name: T | "default"): boolean; //exist slot
  list(name: T | "default"): React.ReactNode[]; // list of slots
};
```

- Recognize `slot`, `slotName` y `"slot-name"`.
- All child **without name** belongs `default` slot.
- Return arrays to suppport **many childs by slot**.

## Scripts

- `npm run dev` → build en watch con tsup
- `npm run build` → ESM + CJS + d.ts
- `npm test` → Vitest (jsdom)

## License

MIT
