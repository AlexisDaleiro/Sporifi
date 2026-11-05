# Sporifi — Diagnóstico y plan de trabajo

Revisión hecha el 2026-11-04 sobre `main` (último commit `638c41c`, 2025-08-01).

## Progreso

- **Fase 0 — hecha** (2026-11-04): historial limpio, proyecto en la raíz, `.gitignore` de audio, logo propio (`public/logo.svg`), portada por defecto (`public/default-cover.svg`), nombre unificado a "Sporifi", README real, `.env.example`.
  - Queda para la Fase 2: borrar las portadas de `src/assets/` junto con el catálogo local del store (todavía las usa).
- **Fase 1 — hecha salvo lo marcado:** lint sin errores, Redux y `react-redux` fuera, archivos muertos borrados, `index.html` corregido, `<style>` inline movidos a `App.css`, dependencias actualizadas dentro de su rango.
  - Pendiente: `react-howler` (sale en Fase 3) y evaluar majors (Vite 8, ESLint 10, plugin-react 6, react-hooks 7).
- **Fase 2 — hecha, falta verificar contra la API real** (2026-11-05): `src/services/jamendo.js` (`request`, normalizadores, `getPopularTracks`, `searchTracks`, `getTrack`, `getArtist`, `getArtistTracks`, `getAlbum`, `getPlaylist`), `src/hooks/useFetch.js`, `npm test` (node:test, 5 tests de la capa de datos). Home y Artist ya leen de Jamendo; catálogo local, portadas viejas, `axios` y MusicBrainz eliminados; crédito "Música vía Jamendo" en el sidebar.
  - **Sin verificar:** el `client_id` de prueba de la documentación está suspendido (código 11), así que las formas de respuesta reales (`position`, tracks anidados de `playlists/tracks`, orden `popularity_week`) siguen sin comprobar. Verificar con `.env.local` propio antes de la Fase 3.
  - Confirmado: Jamendo responde HTTP 200 aunque falle (el error va en `headers.status`) y permite CORS desde el navegador (`access-control-allow-origin: *`).
- **Fase 3 en adelante:** sin empezar.

*La sección 1 de abajo es el diagnóstico original, antes de las Fases 0 y 1.*

## 1. Estado actual

**Stack:** React 19 + Vite 7 + React Router 7 + Zustand 5 + Bootstrap 5 / react-bootstrap + react-howler. JavaScript (sin TypeScript). Node 24 local.

**Qué funciona hoy**
- `npm ci` y `npm run build` pasan.
- Layout principal (sidebar + navbar + player fijo abajo) con rutas.
- Home lista las canciones del store y las reproduce (play/pausa, anterior/siguiente, volumen, seek por click, auto-next al terminar).
- Página de artista que consulta MusicBrainz + Cover Art Archive.
- Página Premium con modal de planes (`PIndividual`).

**Qué está roto o vacío**

| Área | Problema |
|---|---|
| Lint | 3 errores: `useState` sin uso en `App.jsx`, `setLoading` no definido en `Artist.jsx` (rompe en runtime en el `.finally`), `e` sin uso en `Home.jsx`. |
| Assets en build | Rutas como `"/src/assets/x.mp3"` son strings: funcionan en `vite dev` pero **en el build de producción no existen** (Vite no las copia). El deploy no tendría audio ni portadas. |
| Catálogo | 3 de 7 tracks tienen `src` inválido (`"Thirty Seconds to Mars"`, `"Oh The Larceny - Can t Stop Me Now.flac"` sin ruta, `Innerpartysystem` sin extensión). La de 30STM dice artista "The Killers". 5 archivos de audio no están en la lista (Electric Callboy, Royal Deluxe, Superlaser, Walgrove, 30STM - Stuck). |
| Páginas vacías | `Search.jsx` y `Playlist.jsx` son funciones vacías; `services/api.js` y `components/SongCard.jsx` están vacíos; `Condiciones` e `InstallApp` son solo un `<h1>`. |
| Navbar | Búsqueda solo hace `console.log`; menú móvil es la plantilla de Tailwind UI (Dashboard/Team/Projects, "Tom Cook"); `data-bs-toggle` sin el JS de Bootstrap; `import { React }` incorrecto; import de `Buypremium` sin uso. |
| Sidebar | Links `href="#"` (no navegan); "Crear Playlist" y "Tus Favoritos" no hacen nada. |
| Home | Chips Todo/Música/Podcast inertes; "Mix Diario 1-4" hardcodeados con picsum; `key={index}`. |
| Artist | Busca por nombre libre (`query=artist:${id}`) y toma el primer resultado; crashea si `area`, `begin-area`, `tags` o `life-span` vienen `undefined`; sin manejo de error; tags se renderizan pegados. |
| Player | Fallback a `via.placeholder.com` (servicio caído); `isLoading` nunca se pone en `true`; barra de progreso no se puede arrastrar; botones de ícono sin `aria-label`; estilos inline con `<style>`. |
| Premium | Textos de Duo y Familiar copiados del Individual; precios inconsistentes (7,99 vs 9.99); modal "Woohoo" de plantilla nunca se abre; botones sin acción. |
| Varios | `store/song.jsx` es un componente dentro de `store/` y no se usa; `NotFound` fuera del layout y con `href="#"`; `index.html` con `lang="en"`, favicon de Vite y `App.css` linkeado dos veces; nombre inconsistente "Sporify" / "Sporifi"; README es la plantilla de Vite. |
| Dependencias | `@reduxjs/toolkit` y `react-redux` instalados y **sin uso**. `react-howler` sin mantenimiento (se puede reemplazar por `<audio>` nativo). Todo desactualizado en minor (React 19.3, Router 7.18, Vite 7.3); majors disponibles: Vite 8, ESLint 10, plugin-react 6, react-hooks 7. |
| Repo | **192 MB** en git: 12 FLAC/MP3 de 5–25 MB cada uno, con copyright, en un repo público de GitHub. Problema legal y de deploy (Vercel/Netlify limitan tamaño). El proyecto vive en una subcarpeta `Sporifi/Sporifi`. |
| Nombres de archivo | `src/assets/negrofortnite.webp` (portada por defecto del player): renombrar, el nombre es ofensivo y queda público. |
| Marca | Usa logos e íconos de Spotify (`icons8-spotify.svg`, `spotify-*.svg`). Para portfolio público conviene logo propio. |
| Calidad | Sin tests, sin CI, sin deploy. |

## 2. Decisiones a tomar antes de arrancar

1. **Fuente de música — DECIDIDO: Jamendo API v3** (`https://api.jamendo.com/v3.0/`). Música Creative Commons, tracks completos en MP3, búsqueda, artistas, álbumes, playlists y portadas. Requiere `client_id` gratis (registrarse en developer.jamendo.com). Uso no comercial con atribución: mostrar "Música vía Jamendo" y el nombre del artista. Descartadas: Spotify (`preview_url` nulo para apps nuevas), Deezer/iTunes (solo 30 s + proxy por CORS), Audius (alternativa si Jamendo falla).
2. **Alcance:** ¿solo frontend (favoritos y playlists en `localStorage`) o con backend/login? Recomendación: solo frontend. Backend = otro proyecto.
3. **UI:** mantener Bootstrap (menos reescritura) o migrar a Tailwind. Recomendación: mantener Bootstrap y limpiar.
4. **Historial de git — DECIDIDO: limpiar.** Se borran del historial los audios y `negrofortnite.webp` con `git filter-repo` y se hace force push. Es irreversible: antes se guarda un backup espejo. Pasos en la Fase 0.

## 3. Plan por fases

Cada fase termina con `npm run lint`, `npm run build` (y `npm test` desde la fase 6) en verde y un commit.

### Fase 0 — Higiene del repo

**0.1 Limpieza del historial — HECHO 2026-11-04.** Repo bajó de 192 MB a 740 KB, proyecto ya en la raíz, force push hecho (`638c41c` → `80754fb`). Backup en `../Sporifi-backup.git`. Pendiente: borrar el backup cuando se confirme que todo está bien.
Una sola reescritura saca los audios y el archivo ofensivo de todo el historial y, de paso, mueve el proyecto de `Sporifi/` a la raíz.

1. Backup espejo fuera del repo (se puede restaurar todo desde acá):
   `git clone --mirror https://github.com/AlexisDaleiro/Sporifi.git ../Sporifi-backup.git`
2. Instalar la herramienta: `py -m pip install git-filter-repo`.
3. Guardar `PLAN.md` fuera del repo (no está trackeado; el reset final no lo toca, pero por seguridad).
4. Reescribir:
   ```
   git filter-repo --force \
     --path-glob '*.flac' --path-glob '*.mp3' \
     --path Sporifi/src/assets/negrofortnite.webp \
     --invert-paths
   git filter-repo --force --subdirectory-filter Sporifi
   ```
5. Verificar: `git count-objects -vH` (debería bajar de ~192 MB a pocos MB), `git log --stat` y que `npm ci && npm run build` sigan andando (el build pasa porque las rutas de audio son strings; el player no va a sonar hasta la Fase 2, es esperado).
6. `filter-repo` borra el remote. Volver a agregarlo y subir:
   `git remote add origin https://github.com/AlexisDaleiro/Sporifi.git`
   `git push --force --all && git push --force --tags`
7. Cualquier otro clon del repo (otra PC) hay que borrarlo y clonar de nuevo.
8. Borrar el backup cuando todo esté confirmado. GitHub puede guardar copias en caché de objetos viejos un tiempo; si importa, se pide purga a GitHub Support.

**0.2 Resto de la limpieza.**
- Agregar `*.flac`/`*.mp3` a `.gitignore`. Borrar las portadas de los artistas que ya no se usan.
- Poner una portada por defecto nueva (ej. `default-cover.webp`) y actualizar la referencia en el store.
- Reemplazar logos de Spotify por un logo propio (el SVG "S" verde del sidebar ya sirve de base).
- Unificar nombre: "Sporifi".
- README real: qué es, cómo correrlo, variables de entorno, capturas.

### Fase 1 — Base sana
- Arreglar los 3 errores de lint.
- `npm update` (minors). Evaluar majors (Vite 8, ESLint 10, plugin-react 6, react-hooks 7) en commit aparte.
- Quitar `@reduxjs/toolkit`, `react-redux`; quitar `react-howler` cuando el player use `<audio>` (fase 3).
- Borrar `store/song.jsx`, `components/SongCard.jsx` vacío (o implementarlo en fase 4), `services/api.js` vacío.
- `index.html`: `lang="es"`, favicon propio, quitar el `<link>` duplicado a `App.css`.
- Mover `<style>` inline de `Player` y `Home` a CSS.

### Fase 2 — Capa de datos
- `src/services/jamendo.js` con `fetch` (sin axios): `searchTracks`, `getTrack`, `getArtist`, `getArtistTracks`, `getAlbum`, `getPlaylist`, `getPopular`. Endpoints: `/tracks`, `/artists`, `/artists/tracks`, `/albums`, `/albums/tracks`, `/playlists/tracks`, con `format=json`, `limit`, `order=popularity_total` y `include=musicinfo` donde aplique. Usar el campo `audio` de cada track como `src`.
- `client_id` en `VITE_JAMENDO_CLIENT_ID` (`.env.local`, ignorado por git) + `.env.example` versionado. Es una key pública de solo lectura: va en el frontend, no hace falta backend.
- Revisar `headers.status` / `headers.code` en cada respuesta: Jamendo devuelve 200 aun cuando hay error.
- Quitar MusicBrainz de `Artist.jsx`: los artistas de Jamendo casi nunca están ahí.
- Un hook simple para fetch con estados `loading / error / data` (o TanStack Query si el proyecto crece; no hace falta al inicio).
- Normalizar todo a un formato `Track { id, title, artistId, artistName, albumId, cover, src, duration }`.

### Fase 3 — Reproductor completo
- Reemplazar `react-howler` por un `<audio>` nativo controlado por el store.
- Store con **cola**: `queue`, `index`, `playQueue(tracks, startIndex)`, `next`, `prev` (si van >3 s, reinicia la canción), `shuffle`, `repeat` (off / all / one).
- Barra de progreso con `<input type="range">` (arrastrable, accesible).
- Mute, estado de carga real (`waiting`/`canplay`), error con mensaje y salto al siguiente.
- `navigator.mediaSession` (controles del SO y teclas multimedia) y atajos: espacio, flechas.
- `zustand/middleware` `persist` para volumen, última canción y cola.

### Fase 4 — Páginas y features
- **Navbar:** búsqueda navega a `/search?q=`; menú móvil real (Inicio, Buscar, Biblioteca, Premium); quitar notificaciones/perfil falsos o dejarlos como menú simple.
- **Sidebar:** `NavLink` con estado activo; lista de playlists del usuario.
- **Home:** secciones dinámicas (populares, por género, "recientes" desde el historial persistido); `SongCard` reutilizable; chips de filtro funcionales o eliminados.
- **Search:** input con debounce, resultados por canciones / artistas / álbumes, estados vacío y de carga.
- **Artist `/artist/:id`:** usar el ID de Jamendo (no el nombre); header con imagen, top tracks reproducibles, álbumes.
- **Album `/album/:id`** (nuevo) y **Playlist `/playlist/:id`:** lista de tracks, "reproducir todo", duración total.
- **Biblioteca `/library`** (nuevo): favoritos (corazón en cada track) y playlists propias (crear, renombrar, borrar, agregar/quitar tracks) en `localStorage` vía `persist`.
- **Premium:** planes en un array de datos, textos y precios correctos, botones que lleven a un "checkout" simulado o que digan claramente que es demo. Quitar el modal de plantilla.
- **Condiciones / InstallApp:** contenido real breve. InstallApp puede usar el evento `beforeinstallprompt` si se convierte en PWA (opcional).
- **NotFound:** dentro del layout, `Link` a `/`, en español.

### Fase 5 — UI/UX
- Tema oscuro consistente (variables CSS en `:root`), quitar mezcla `bg-dark` / cards blancas.
- Responsive real: sidebar colapsa a barra inferior o drawer en móvil; player compacto en móvil.
- Accesibilidad: `aria-label` en botones de ícono, foco visible, contraste, `alt` en imágenes.
- Skeletons de carga y estados vacíos.
- Lazy loading de rutas (`React.lazy`) e imágenes (`loading="lazy"`).

### Fase 6 — Calidad
- Vitest + Testing Library: tests de la lógica de cola del store (next/prev/shuffle/repeat) y un smoke test de render de rutas.
- GitHub Actions: `npm ci && npm run lint && npm test && npm run build` en cada push/PR.

### Fase 7 — Deploy
- Vercel o Netlify con rewrite SPA (`/* -> /index.html`) porque se usa `BrowserRouter`.
- Variables de entorno configuradas en el panel del host.
- Link del demo en el README.

## 4. Definición de terminado
- Lint, tests y build en verde en CI.
- Deploy público funcionando, con audio, sin assets con copyright ni logos de terceros.
- Todas las rutas del menú llevan a páginas con contenido real; ningún `href="#"`, `console.log` ni texto de plantilla.
- Se puede: buscar, ver artista/álbum/playlist, reproducir con cola/shuffle/repeat, marcar favoritos, crear playlists, y que todo persista al recargar.
- Usable en móvil y con teclado.

## 5. Prompt para arrancar

Copiar y pegar en una sesión nueva de Claude Code abierta en la raíz del repo (ajustar las decisiones marcadas):

```text
Estoy retomando Sporifi, un clon de reproductor de música hecho con React 19 + Vite 7 +
React Router 7 + Zustand + Bootstrap. Leé PLAN.md en la raíz del repo: tiene el
diagnóstico completo y un plan por fases. Trabajamos fase por fase.

Decisiones tomadas:
- Fuente de música: Jamendo API v3 (ya tengo `client_id`; lo pongo en `.env.local`
  como `VITE_JAMENDO_CLIENT_ID`). El audio local se elimina.
- Alcance: solo frontend; favoritos y playlists en localStorage.
- UI: mantener Bootstrap.
- Historial de git: limpiarlo con git filter-repo según el paso 0.1 de PLAN.md
  (backup espejo primero; mostrame el comando de force push y esperá mi OK).

Empezá por la Fase 0 y la Fase 1:
1. Antes de tocar nada, confirmá el estado corriendo `npm ci`, `npm run lint` y
   `npm run build` dentro de la carpeta del proyecto.
2. Ejecutá cada ítem de la fase. No agregues dependencias nuevas sin preguntarme.
   Preferí APIs nativas (fetch, <audio>) sobre librerías.
3. Cualquier operación irreversible (borrar archivos de audio, reescribir el
   historial de git, force push) me la mostrás y esperás mi OK.
4. Al terminar cada fase: lint y build en verde, un commit con mensaje claro,
   y un resumen corto de qué cambió y qué quedó pendiente. Marcá en PLAN.md los
   ítems completados.
5. Si algo del plan no tiene sentido al ver el código, decímelo antes de seguir.

No avances a la Fase 2 sin que yo lo confirme.
```
