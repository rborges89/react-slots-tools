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

function Card({ children }: { children: React.ReactNode }) {
  const { get } = useSlots(children);
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
      <h1 slot="header">Título</h1>
      <p>Contenido por defecto</p>
      <small slot-name="footer">© 2025</small>
    </Card>
  );
}
```

## API

```ts
function useSlots(children: React.ReactNode): {
  slots: Record<string, React.ReactNode[] | undefined>; // incluye 'default'
  get(name: string, fallback?: React.ReactNode): React.ReactNode; // lista o fallback
  has(name: string): boolean;
  list(name: string): React.ReactNode[]; // array puro para mapear
};
```

- Reconoce `slot`, `slotName` y `"slot-name"`.
- Todo child **sin nombre** cae en el slot `default`.
- Devuelve arrays para soportar **múltiples hijos por slot**.

## Scripts

- `npm run dev` → build en watch con tsup
- `npm run build` → ESM + CJS + d.ts
- `npm test` → Vitest (jsdom)

## License

MIT
