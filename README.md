# Sporifi

Reproductor de música web hecho con React. Proyecto personal en desarrollo: el catálogo va a venir de la API de [Jamendo](https://developer.jamendo.com/v3.0/docs) (música Creative Commons).

## Stack

React 19 · Vite · React Router · Zustand · Bootstrap / react-bootstrap

## Correr el proyecto

```bash
npm ci
npm run dev
```

Otros scripts: `npm run lint`, `npm run build`, `npm run preview`.

### Variables de entorno

Copiar `.env.example` a `.env.local` y completar `VITE_JAMENDO_CLIENT_ID` con el `client_id` gratuito de Jamendo. *(Se usa a partir de la Fase 2 del plan.)*

## Estado

Ver [PLAN.md](PLAN.md) para el diagnóstico y las fases pendientes.

## Créditos

Música vía [Jamendo](https://www.jamendo.com), cada canción bajo la licencia Creative Commons indicada por su artista.
