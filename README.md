# Larper Corp — Condominios en Cancún

Frontend de la plataforma inmobiliaria Larper Corp, construido a partir del **Manual de Diseño Larper Corp**
(minimalismo editorial: tinta, marfil, piedra y un acento vino; Noto Serif Display + Lato; motion medido).

**Stack:** React 19 · Vite · Tailwind CSS v4 · React Router · Motion · Lucide · Vitest.

## Scripts

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve el build
npm test          # pruebas de lógica (filtros, validación)
npm run lint      # oxlint
```

## Pantallas

| Ruta | Pantalla | Carpeta |
|---|---|---|
| `/` | Inicio (hero en Z, buscador, destacadas, manifiesto, zonas) | `src/screens/Home` |
| `/comprar` | Catálogo en venta, filtros en la URL | `src/screens/Catalog` |
| `/rentar` | Catálogo en renta (misma pantalla, otra operación) | `src/screens/Catalog` |
| `/propiedad/:id` | Detalle: galería, ficha técnica, amenidades, solicitar visita | `src/screens/PropertyDetail` |
| `/nosotros` | Empresa, proceso y principios | `src/screens/About` |
| `/contacto` | Solicitar visita (formulario validado) | `src/screens/Contact` |
| `*` | 404 | `src/screens/NotFound` |

## Arquitectura

```
src/
├── app/            # App, router (rutas con carga diferida)
├── styles/         # index.css: tokens del manual en @theme (color, tipo, sombras, curvas)
├── lib/            # utilidades puras: formato MXN, validación, tokens de motion
├── data/           # catálogo de muestra (fuente única hasta conectar API)
├── services/       # acceso a datos: properties.service, contact.service (+ tests)
├── hooks/          # lógica reutilizable: useAsync, useDelayedFlag, useSaved, useScrolled
├── components/
│   ├── brand/      # Logo (horizontal, wordmark, monograma)
│   ├── ui/         # Button, Field, Alert, Skeleton, Reveal, Container
│   ├── layout/     # Navbar, MobileMenu, Footer, RootLayout (transición de rutas)
│   └── property/   # PropertyCard, PropertyGrid, PropertyArt (SVG), SaveButton
└── screens/        # una carpeta por pantalla
    └── <Pantalla>/
        ├── <Pantalla>Screen.jsx   # composición (presentación)
        ├── use<Pantalla>.js       # lógica de la pantalla
        └── components|sections/   # piezas exclusivas de esa pantalla
```

**Separación:** el diseño vive en `styles/` (tokens) y `lib/motion.js`; la lógica en `services/`, `hooks/` y los
`use*.js` de cada pantalla; los componentes solo presentan. Para conectar un backend real se reemplazan las
funciones de `services/` (están marcadas con `shortcut:`), sin tocar pantallas.

## Correspondencia con el manual

- **Color (3.1):** `ink #161616`, `canvas #F7F6F3`, `stone #E8E6E1`, `divider #D5D3CE`, `muted #6B6B67`, `accent #713A39` + estados funcionales (3.3).
- **Tipografía (4.2):** escala H1–Small escritorio/móvil como utilidades `text-h1 … text-small`.
- **Componentes (7.x):** botón H48/R4/22px, campos con etiqueta permanente y validación al salir del campo, tarjeta 4:3 R8 con elevación de 2 px, navbar 80/64 px, alertas con ícono + texto.
- **Motion (9.2):** `cubic-bezier(.22,1,.36,1)` y `(.4,0,.2,1)`, tarjetas fade + 10 px, stagger 40 ms (máx. 5), skeleton tras 200 ms, `prefers-reduced-motion` respetado (CSS y `MotionConfig`).
- **Accesibilidad (9.3):** `lang="es-MX"`, foco de 2 px visible, áreas de 44 px, enlace "saltar al contenido", menú móvil con foco atrapado y Esc.
- **Fotografía (6):** ilustraciones SVG arquitectónicas generativas y monocromas (`PropertyArt`), sustituibles por fotografía real AVIF/WebP.

## Despliegue

- **GitHub Pages:** `.github/workflows/deploy-pages.yml` prueba, construye y publica en cada push a `main`
  (o a la rama de desarrollo) y también a mano desde la pestaña *Actions*. Requiere activar una vez
  *Settings → Pages → Source: GitHub Actions*. URL: `https://<usuario>.github.io/Larpers-Corp/`.
- **Vista previa en un solo archivo:** `npm run build:artifact` genera `dist-artifact/index.html` autocontenido
  (router en memoria, sin dependencias externas).
