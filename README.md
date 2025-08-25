# @burning89/react-slots-tools

Hook for named slots from react `children` special prop, (similar to Vue/Svelte/Web Components)..

## Install

```bash
npm i @burning89/react-slots-tools
# or
pnpm add @burning89/react-slots-tools
# or
yarn add @burning89/react-slots-tools
```

## Usage

- Recognize `slot`, `slotName` y `"parent-slot"`.
- All child **without name** belongs `default` slot.
- Return arrays to suppport **many childs by slot**.

### Using the get method of the API:

```tsx
import * as React from "react";
import { useSlots } from "@burning89/react-slots-tools";

/* describes the supported slot names along with "default" */
type ExposedSlotsType = "header" | "footer";

function Card({ children }: { children: React.ReactNode }) {
  const { get } = useSlots<ExposedSlotsType>(children);

  return (
    <div>
      <header>{get("header", <div>No header</div>)}</header>
      <section>{get("default")}</section>
      <footer>{get("footer")}</footer>
      <!-- Warning: Typescript error because nav slot is not typed in ExposedSlotsType -->
      <footer>{get("nav")}</footer>
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

/* describes the supported slot names along with "default" */
type ExposedSlotsType = "header" | "footer";

function Card({ children }: { children: React.ReactNode }) {
  const { slots } = useSlots<ExposedSlotsType>(children);

  return (
    <div>
      <header>{slots.header}</header>
      <section>{slots.default}</section>
      <footer>{slots.footer}</footer>
      <!-- Warning: Typescript error because nav slot is not typed in ExposedSlotsType -->
      <span>{slots.nav}</span>
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
  // return slots based on generic T keys (include 'default' slot)
  slots: Partial<Record<T | "default", React.ReactNode[]>> & {
    default: React.ReactNode[];
  };
  // get slot by name or fallback
  get(name: T | "default", fallback?: React.ReactNode): React.ReactNode;
  //check if slot exist
  has(name: T | "default"): boolean;
  // slots list by name or fallback
  list(name: T | "default"): React.ReactNode[];
};
```

## Scripts

- `npm run dev` → build en watch con tsup
- `npm run build` → ESM + CJS + d.ts
- `npm test` → Vitest (jsdom)

## License

MIT
