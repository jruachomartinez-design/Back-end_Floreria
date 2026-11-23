import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import ClienteLayout from '@/layouts/ClienteLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Las rutas salen de la tabla del mapa del sitio (README, sección 9.2)
// requiereAuth = hay que tener sesión, soloAdmin = además tiene que ser administrador
const routes = [
  {
    path: '/',
    component: ClienteLayout,
    children: [
      // ---------- Joan ----------
      { path: '', name: 'inicio', component: () => import('@/views/cliente/InicioView.vue') },
      {
        path: 'nosotros',
        name: 'nosotros',
        component: () => import('@/views/cliente/NosotrosView.vue'),
      },
      { path: 'flores', name: 'flores', component: () => import('@/views/cliente/FloresView.vue') },
      {
        path: 'flores/:id',
        name: 'detalle-flor',
        component: () => import('@/views/cliente/DetalleFlorView.vue'),
      },
      {
        path: 'favoritos',
        name: 'favoritos',
        component: () => import('@/views/cliente/FavoritosView.vue'),
        meta: { requiereAuth: true },
      },
      {
        path: 'carrito',
        name: 'carrito',
        component: () => import('@/views/cliente/CarritoView.vue'),
        meta: { requiereAuth: true },
      },
      {
        path: 'compra/entrega',
        name: 'compra-entrega',
        component: () => import('@/views/cliente/CompraEntregaView.vue'),
        meta: { requiereAuth: true },
      },
      {
        path: 'compra/pago',
        name: 'compra-pago',
        component: () => import('@/views/cliente/CompraPagoView.vue'),
        meta: { requiereAuth: true },
      },
      {
        path: 'compra/confirmacion/:folio',
        name: 'compra-confirmacion',
        component: () => import('@/views/cliente/CompraConfirmacionView.vue'),
        meta: { requiereAuth: true },
      },
      {
        path: 'pedidos',
        name: 'pedidos',
        component: () => import('@/views/cliente/PedidosView.vue'),
        meta: { requiereAuth: true },
      },

      // ---------- Yuri ----------
      {
        path: 'registro',
        name: 'registro',
        component: () => import('@/views/cuenta/RegistroView.vue'),
      },
      {
        path: 'iniciar-sesion',
        name: 'iniciar-sesion',
        component: () => import('@/views/cuenta/IniciarSesionView.vue'),
      },
      {
        path: 'restablecer-contrasena',
        name: 'restablecer-contrasena',
        component: () => import('@/views/cuenta/RestablecerContrasenaView.vue'),
      },
      {
        path: 'perfil',
        name: 'perfil',
        component: () => import('@/views/cuenta/PerfilView.vue'),
        meta: { requiereAuth: true },
      },
    ],
  },

  // ---------- Yuri (panel de admin) ----------
  // el login del admin va aparte porque no lleva el menú lateral
  {
    path: '/admin/iniciar-sesion',
    name: 'admin-iniciar-sesion',
    component: () => import('@/views/admin/AdminIniciarSesionView.vue'),
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiereAuth: true, soloAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-panel',
        component: () => import('@/views/admin/AdminPanelView.vue'),
      },
      {
        path: 'productos',
        name: 'admin-productos',
        component: () => import('@/views/admin/AdminProductosView.vue'),
      },
      {
        path: 'categorias',
        name: 'admin-categorias',
        component: () => import('@/views/admin/AdminCategoriasView.vue'),
      },
      {
        path: 'pedidos',
        name: 'admin-pedidos',
        component: () => import('@/views/admin/AdminPedidosView.vue'),
      },
      {
        path: 'pedidos/:id',
        name: 'admin-pedido-detalle',
        component: () => import('@/views/admin/AdminPedidoDetalleView.vue'),
      },
      {
        path: 'clientes',
        name: 'admin-clientes',
        component: () => import('@/views/admin/AdminClientesView.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'no-encontrado',
    component: () => import('@/views/NoEncontradoView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// Guard sencillo, cuando ya funcione el login del back hay que revisarlo (Yuri)
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.soloAdmin && !auth.esAdmin) {
    return { name: 'admin-iniciar-sesion', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiereAuth && !auth.estaLogueado) {
    return { name: 'iniciar-sesion', query: { redirect: to.fullPath } }
  }
})

export default router
