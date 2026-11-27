<script setup>
// Le toca a Joan — issue #27 / #30
// Login del admin (RF-ADMIN-01, 15), frame "A1 · Inicio de sesión (Administrador)"
// es casi igual al del cliente pero sin header y con el link para regresar al sitio
import { ref } from 'vue'

const correo = ref('')
const contrasena = ref('')
const recordarme = ref(false)
const error = ref('')

function iniciarSesion() {
  // TODO: mismo POST /auth/login, pero si el rol no es admin hay que mostrar error
  error.value = ''
}
</script>

<template>
  <main class="login-admin">
    <section class="tarjeta vista-angosta">
      <p class="logo">Zantedeschia</p>
      <p class="subtitulo">Florería · Torreón</p>

      <h1>Panel de administración</h1>
      <p>Acceso exclusivo para el personal de la florería.</p>

      <form class="formulario" @submit.prevent="iniciarSesion">
        <label class="campo">
          Correo o usuario
          <input v-model="correo" type="email" placeholder="admin@zantedeschia.mx" required />
        </label>
        <label class="campo">
          Contraseña
          <input v-model="contrasena" type="password" placeholder="••••••••••" required />
        </label>

        <div class="fila-entre">
          <label class="check">
            <input v-model="recordarme" type="checkbox" />
            Recordarme
          </label>
          <RouterLink to="/restablecer-contrasena">¿Olvidaste tu contraseña?</RouterLink>
        </div>

        <p v-if="error" class="mensaje-error">{{ error }}</p>

        <button type="submit" class="boton">Iniciar sesión</button>
      </form>

      <RouterLink to="/" class="texto-centro">← Volver al sitio de clientes</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.login-admin {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}
</style>
