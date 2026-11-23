# Design

Mundo visual: **minimalismo editorial monocromático** — "Menos elementos. Más intención."
Implementación de tokens en `src/styles/index.css`; motion en `src/lib/motion.js`.

## Superficies
- Modo *Persuade*: Inicio, Nosotros. Modo *Operate*: Catálogo, Detalle, Contacto.
- Lectura en Z en Inicio: logotipo → navegación → titular/ilustración en diagonal → acción anclada a la imagen.

## Reglas
- Color 60/30/10: fondos neutros, estructura en tinta, vino solo como acento (guardado, número de proceso, cursor).
- Dos familias: Noto Serif Display (H1–H3, nombres de propiedad), Lato (todo lo demás).
- Extensión única a la escala: `text-display` solo para el titular del hero de Inicio.
- Una acción primaria por zona. Etiquetas en mayúsculas con tracking 0.06–0.12em; nunca párrafos en mayúsculas.
- Sin eyebrows sobre titulares, sin gradientes, sin glass, sin sombras duras.

## Motion
- Momento firma: hero (titular por máscara, torres que se levantan por clip, horizonte que se dibuja).
- Segundo momento: manifiesto con opacidad por palabra ligada al scroll.
- Micro: tarjetas +2 px/220 ms, indicador deslizante en tabs (220 ms), menú móvil por clip-path (340 ms).
- Reduced motion: sin desplazamientos; scroll-linked desactivado; skeleton estático.
