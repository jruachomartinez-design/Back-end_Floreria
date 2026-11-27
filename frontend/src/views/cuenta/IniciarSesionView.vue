<script setup>
// Le toca a Joan — issue #27
// Login del cliente (RF-USER-15), sale del frame "inicio-de-sesion" del Figma
import { ref } from 'vue'

const correo = ref('')
const contrasena = ref('')
const recordarme = ref(false)
const error = ref('')

function iniciarSesion() {
  // TODO: pegarle a POST /auth/login y guardar el token con auth.guardarSesion
  error.value = ''
}
</script>

<template>
  <section class="vista vista-angosta">
    <h1>Iniciar sesión</h1>

    <form class="formulario" @submit.prevent="iniciarSesion">
      <label class="campo">
        Correo o usuario
        <input v-model="correo" type="email" placeholder="usuario@zantedeschia.mx" required />
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

      <!-- el mensaje de error del figma: "Correo o contraseña incorrectos" -->
      <p v-if="error" class="mensaje-error">{{ error }}</p>

      <button type="submit" class="boton">Iniciar sesión</button>
    </form>

    <p class="texto-centro">
      ¿Aún no tienes una cuenta?
      <RouterLink to="/registro">Regístrate</RouterLink>
    </p>
  </section>
</template>
