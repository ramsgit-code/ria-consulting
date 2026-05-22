# Panel Admin — Configuracion

## 1. Supabase (PostgreSQL)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **Project Settings → Database**.
3. Copia la **Connection string** del **Connection pooler** (modo Transaction, puerto 6543).
4. Añade `?pgbouncer=true` al final si no viene.
5. Pégala en `DATABASE_URL` en `.env.local` y en Vercel.

## 2. Migraciones

```bash
cd captacion-web
cp .env.example .env.local
# Edita DATABASE_URL

npx prisma migrate deploy
# o en desarrollo:
npx prisma db push
```

## 3. Admin login

Genera el hash de la contraseña:

```bash
npm run admin:hash -- tu-password-segura
```

Copia el resultado en `.env.local`:

```env
ADMIN_EMAIL=tu@email.com
ADMIN_PASSWORD_HASH=...
NEXTAUTH_SECRET=...   # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

En produccion (Vercel), `NEXTAUTH_URL` debe ser `https://tudominio.com`.

## 4. Arrancar

```bash
npm run dev
```

- Web: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## 5. Vercel

Variables de entorno obligatorias:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- Variables `GHL_*` si quieres sincronizar con Go High Level

En **Build Command**, puedes usar:

```bash
prisma generate && prisma migrate deploy && next build
```

(o ejecutar `migrate deploy` manualmente la primera vez).

## 6. Uso del admin

| Seccion | Funcion |
|---------|---------|
| Dashboard | Resumen leads, visitas, conversion |
| Blog | Crear, editar, publicar articulos |
| Leads | Ver envios del formulario de diagnostico |
| Analytics | Visitas, top paginas, conversion diagnostico |

Los articulos publicados aparecen en `/blog`.

## 7. Analytics

El tracker registra cada cambio de pagina (excepto `/admin` y `/api`).
La conversion se calcula como: `envios formulario / visitas a /diagnostico` en el periodo seleccionado.
