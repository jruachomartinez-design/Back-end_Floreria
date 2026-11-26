# Frontend — Florería Zantedeschia

App en Vue 3 + Vite + Vue Router + Pinia (lo que quedó en la sección de tecnologías del README principal).

## Para correrlo

```sh
cd frontend
npm install
cp .env.example .env   # en Windows: copy .env.example .env
npm run dev
```

Se abre en http://localhost:5173. El back tiene que estar corriendo en el puerto que diga `VITE_API_URL`.

## Estructura

```
src/
  layouts/     ClienteLayout (header + footer) y AdminLayout (menú lateral)
  views/
    cliente/   catálogo, carrito y flujo de compra
    cuenta/    registro, login, recuperar contraseña y perfil
    admin/     panel de administración
  stores/      auth (sesión) y carrito
  services/    api.js, el helper para hacer las peticiones al back
  router/      todas las rutas + el guard de sesión
```

## Reparto de vistas

**Joan — login, registro y administración**

| Vista | Ruta | Issue |
| --- | --- | --- |
| Inicio de sesión | `/iniciar-sesion` | #27 |
| Registro | `/registro` | #27 |
| Restablecer contraseña | `/restablecer-contrasena` | #27 |
| Login del administrador | `/admin/iniciar-sesion` | #27 / #30 |
| Layout del admin | — | #30 |
| Panel general | `/admin` | #30 |
| Inventario de flores | `/admin/productos` | #30 |
| Categorías | `/admin/categorias` | #30 |
| Clientes | `/admin/clientes` | #30 |
| Pedidos | `/admin/pedidos` | #31 |
| Detalle de pedido | `/admin/pedidos/:id` | #31 |

**Yuri — vistas del cliente**

| Vista | Ruta | Issue |
| --- | --- | --- |
| Layout del cliente | — | #25 |
| Inicio | `/` | #25 |
| Nosotros | `/nosotros` | #25 |
| Catálogo de flores | `/flores` | #26 |
| Detalle de producto | `/flores/:id` | #26 |
| Favoritos | `/favoritos` | #26 |
| Carrito | `/carrito` | #28 |
| Dirección de entrega | `/compra/entrega` | #29 |
| Método de pago (Stripe) | `/compra/pago` | #29 |
| Confirmación de pedido | `/compra/confirmacion/:folio` | #29 |
| Mis pedidos | `/pedidos` | #31 |
| Mi perfil | `/perfil` | #27 |

Cada vista ya tiene su estructura armada según el Figma (formularios, tablas y tarjetas), con datos vacíos y `TODO` donde falta conectar con el back.
El diseño está en el link de Figma del README principal (páginas "Cliente" y "Administrador").

Las issues #32 (diseño adaptable) y #33 (validaciones y mensajes) las hace cada quien en sus propias vistas.

## Cómo trabajamos

- Cada quien en su rama: `feat/front-<lo-que-sea>` y PR a `main`.
- No mover las vistas de la otra persona sin avisar, así no nos pisamos.
- Lo compartido (`router`, `services/api.js`, `assets/`) se cambia con cuidado y se avisa en el PR.
