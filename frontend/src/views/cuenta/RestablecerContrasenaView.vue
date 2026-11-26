<script setup>
// Le toca a Joan — issue #27
// Restablecer contraseña (RF-USER-19)
// no viene en el figma, así que la dejo igual de sencilla que el login
import { ref } from 'vue'

const correo = ref('')
const enviado = ref(false)

function enviarCorreo() {
  // TODO: falta que el back tenga el endpoint para esto
  enviado.value = true
}
</script>

<template>
  <section class="vista vista-angosta">
    <h1>Restablecer contraseña</h1>

    <form v-if="!enviado" class="formulario" @submit.prevent="enviarCorreo">
      <p>Escribe tu correo y te mandamos un enlace para cambiar tu contraseña.</p>
      <label class="campo">
        Correo
        <input v-model="correo" type="email" placeholder="usuario@zantedeschia.mx" required />
      </label>
      <button type="submit" class="boton">Enviar enlace</button>
    </form>

    <p v-else>Listo, revisa tu correo.</p>

    <p class="texto-centro">
      <RouterLink to="/iniciar-sesion">Volver a iniciar sesión</RouterLink>
    </p>
  </section>
</template>
