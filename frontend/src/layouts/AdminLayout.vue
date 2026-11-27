<script setup>
// Layout del admin con el menú lateral — le toca a Joan, issue #30
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function salir() {
  auth.cerrarSesion()
  router.push({ name: 'admin-iniciar-sesion' })
}
</script>

<template>
  <div class="admin">
    <aside class="menu">
      <strong>Administración</strong>
      <RouterLink to="/admin" exact-active-class="activo">Panel general</RouterLink>
      <RouterLink to="/admin/productos">Inventario</RouterLink>
      <RouterLink to="/admin/categorias">Categorías</RouterLink>
      <RouterLink to="/admin/pedidos">Pedidos</RouterLink>
      <RouterLink to="/admin/clientes">Clientes</RouterLink>
      <button type="button" @click="salir">Cerrar sesión</button>
    </aside>

    <main class="contenido">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.admin {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
}
.menu {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  border-right: 1px solid var(--color-border);
}
.contenido {
  padding: 2rem;
}
/* en celular el menú se pone arriba, Joan luego lo ajusta en el #32 */
@media (max-width: 768px) {
  .admin {
    grid-template-columns: 1fr;
  }
  .menu {
    flex-direction: row;
    flex-wrap: wrap;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
