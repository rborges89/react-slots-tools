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

## Use

- Recognize `slot`, `slotName` y `"parent-slot"`.
- All child **without name** belongs `default` slot.
- Return arrays to suppport **many childs by slot**.

### Using the get method of the API:

```tsx
import * as React from "react";
import { useSlots } from "@burning89/react-slots-tools";

type ExposedSlotsType = "header" | "footer";

function Card({ children }: { children: React.ReactNode }) {
  const { get } = useSlots<ExposedSlotsType>(children);

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
      <small parent-slot="footer">© 2025</small>
    </Card>
  );
}
```

### Using the generated slots:

```tsx
import * as React from "react";
import { useSlots } from "@burning89/react-slots-tools";

type ExposedSlotsType = "header" | "footer";

function Card({ children }: { children: React.ReactNode }) {
  const { slots } = useSlots<ExposedSlotsType>(children);

  return (
    <div>
      <header>{slots.header}</header>
      <section>{slots.default}</section>
      <footer>{slots.footer}</footer>
      <span>{slots.nav}</span> <!-- Typescript error because nav slot is not typed in ExposedSlotsType -->
    </div>
  );
}

export default function Demo() {
  return (
    <Card>
      <h1 slot="header">title</h1>
      <p>Default content</p>
      <small parent-slot="footer">© 2025</small>
    </Card>
  );
}
```

## API

```ts
function useSlots<T>(children: React.ReactNode): {
  slots: Record<string, React.ReactNode[] | undefined>; // return T slots (include 'default' slot)
  get(name: T | "default", fallback?: React.ReactNode): React.ReactNode; // get slot by name or fallback
  has(name: T | "default"): boolean; //check if slot exist
  list(name: T | "default"): React.ReactNode[]; // slots list by name or fallback
};
```

## Scripts

- `npm run dev` → build en watch con tsup
- `npm run build` → ESM + CJS + d.ts
- `npm test` → Vitest (jsdom)

## License

MIT
