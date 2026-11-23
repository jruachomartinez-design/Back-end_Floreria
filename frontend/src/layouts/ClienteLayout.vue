<script setup>
// Layout del cliente — lo armo yo (Joan), issue #25
// Header con Inicio, Flores, Nosotros, Pedidos, Favoritos + carrito con contador + cuenta
import { useCarritoStore } from '@/stores/carrito'
import { useAuthStore } from '@/stores/auth'

const carrito = useCarritoStore()
const auth = useAuthStore()
</script>

<template>
  <header class="encabezado">
    <RouterLink to="/" class="logo">Zantedeschia</RouterLink>
    <nav>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/flores">Flores</RouterLink>
      <RouterLink to="/nosotros">Nosotros</RouterLink>
      <RouterLink to="/pedidos">Pedidos</RouterLink>
      <RouterLink to="/favoritos">Favoritos</RouterLink>
    </nav>
    <div class="acciones">
      <RouterLink to="/carrito">Carrito ({{ carrito.totalPiezas }})</RouterLink>
      <RouterLink v-if="auth.estaLogueado" to="/perfil">Mi cuenta</RouterLink>
      <RouterLink v-else to="/iniciar-sesion">Iniciar sesión</RouterLink>
    </div>
  </header>

  <main class="contenido">
    <RouterView />
  </main>

  <footer class="pie">
    <!-- TODO: poner el link real de WhatsApp de la florería -->
    <p>Florería Zantedeschia · Torreón, Coah.</p>
  </footer>
</template>

<style scoped>
.encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
}
.logo {
  font-weight: 700;
  font-size: 1.25rem;
}
nav,
.acciones {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.contenido {
  padding: 2rem;
  min-height: 70vh;
}
.pie {
  padding: 1rem 2rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
}
</style>
