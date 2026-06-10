# Portfolio — Guía de Setup Local

Este documento explica qué tecnologías se usaron, sus versiones, y exactamente qué archivos necesitas para replicar este proyecto en tu editor de código.

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| **React** | 18.3.1 | UI library (versión estable LTS recomendada) |
| **TypeScript** | (via Vite) | Tipado estático |
| **Vite** | 6.3.5 | Bundler / dev server |
| **Tailwind CSS** | 4.1.12 | Utilidades de estilos |
| **@tailwindcss/vite** | 4.1.12 | Plugin de Tailwind para Vite |
| **Motion** | 12.23.24 | Animaciones (`motion/react`) |
| **Lucide React** | 0.487.0 | Iconos |
| **tw-animate-css** | 1.3.8 | Animaciones extra para Tailwind |
| **pnpm** | ≥ 8 | Gestor de paquetes |

---

## Estructura de archivos que necesitas

```
mi-portfolio/
├── package.json              ← dependencias y scripts
├── pnpm-lock.yaml            ← lockfile (importante para versiones exactas)
├── vite.config.ts            ← configuración de Vite
├── postcss.config.mjs        ← configuración de PostCSS (vacía, requerida)
├── src/
│   ├── styles/
│   │   ├── index.css         ← punto de entrada de estilos (importa los demás)
│   │   ├── fonts.css         ← Google Fonts imports
│   │   ├── tailwind.css      ← directivas de Tailwind
│   │   └── theme.css         ← tokens de color y tipografía
│   ├── imports/              ← assets del diseño Figma
│   │   ├── image-1.png       ← pixel art (fondo transparente)
│   │   ├── image.png         ← referencia de diseño
│   │   └── Frame9/
│   │       ├── 5ece9633...png   ← foto avatar (circular)
│   │       ├── b5db0c11...png   ← pixel art original
│   │       └── svg-aqb6zm3334.ts ← paths SVG (menú, download)
│   └── app/
│       ├── App.tsx           ← componente raíz
│       └── components/
│           ├── Navbar.tsx
│           ├── HeroSection.tsx
│           ├── AboutSection.tsx
│           ├── TabbedSection.tsx   ← Educación + Herramientas + Carrera
│           ├── ProjectsSection.tsx
│           └── ContactSection.tsx
```

> **La carpeta `src/` sola NO es suficiente.** También necesitas los archivos de configuración listados abajo.

---

## Archivos de configuración necesarios (fuera de `src/`)

### `package.json`
```json
{
  "name": "mi-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "0.487.0",
    "motion": "12.23.24",
    "tw-animate-css": "1.3.8"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "@vitejs/plugin-react": "4.7.0",
    "@types/react": "18.3.1",
    "@types/react-dom": "18.3.1",
    "tailwindcss": "4.1.12",
    "typescript": "5.7.3",
    "vite": "6.3.5"
  },
  "peerDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

### `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
```

### `postcss.config.mjs`
```js
export default {}
```

---

## Archivos de estilos (`src/styles/`)

### `index.css` — punto de entrada
```css
@import './fonts.css';
@import './tailwind.css';
@import './theme.css';
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';
@import 'tw-animate-css';
```

### `fonts.css` — tipografías
```css
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
```

### `tailwind.css`
```css
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';
@import 'tw-animate-css';
```

---

## Punto de entrada React

En tu proyecto local, necesitas un archivo `index.html` en la raíz (Figma Make lo genera automáticamente, pero localmente debes crearlo tú):

### `index.html`
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Omar Anzures — Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `src/main.tsx`
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

> **Nota:** En el entorno de Figma Make, el entrypoint es `__figma__entrypoint__.ts` (generado automáticamente). En tu editor local, lo reemplaza `main.tsx`.

---

## Cómo correr el proyecto localmente

```bash
# 1. Instalar pnpm si no lo tienes
npm install -g pnpm

# 2. Instalar dependencias
pnpm install

# 3. Correr el servidor de desarrollo
pnpm dev
```

Abre `http://localhost:5173` en tu navegador.

---

## Checklist de archivos a copiar

- [ ] `src/` completa (app, styles, imports)
- [ ] `package.json`
- [ ] `vite.config.ts`
- [ ] `postcss.config.mjs`
- [ ] Crear `index.html` (ver arriba)
- [ ] Crear `src/main.tsx` (ver arriba)
- [ ] Correr `pnpm install`

---

## Fuentes usadas

| Fuente | Fuente de descarga | Uso en el proyecto |
|---|---|---|
| Atkinson Hyperlegible | Google Fonts | Cuerpo, subtítulos, badges |
| Ubuntu Mono | Google Fonts | "¿Cómo me defino?" |
| Clash Display | Fontshare | Headings de sección, tabs |

Todas se cargan vía `@import` en `fonts.css` — no necesitas instalar nada extra, solo conexión a internet la primera vez.
