
# @your-scope/react-slots

Hook para extraer y consumir **slots nombrados** desde `children` en React (similar a Vue/Svelte/Web Components).

## Instalación

```bash
npm i @your-scope/react-slots
# o
pnpm add @your-scope/react-slots
# o
yarn add @your-scope/react-slots
```

> **¿Qué es el "scope" en el nombre?**  
En npm, el `scope` es el prefijo `@tu-organizacion` o `@tu-usuario` que agrupa paquetes bajo el mismo espacio de nombres.  
- **Ejemplo público**: `@ramon/react-slots` → se instala como `npm i @ramon/react-slots`.
- **Ejemplo sin scope**: `react-slots` → `npm i react-slots`.
- Para publicar bajo un scope público usa `npm publish --access public`.

## Uso rápido

```tsx
import * as React from "react";
import { useSlots } from "@your-scope/react-slots";

function Card({ children }: { children: React.ReactNode }) {
  const { get } = useSlots(children);
  return (
    <div>
      <header>{get("header", <div>Sin header</div>)}</header>
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
}
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
