<script setup>
// Le toca a Joan — issue #27
// Registro del cliente (RF-USER-01), frame "Registro de Cuenta" del Figma
// los nombres de los campos son los mismos que pide el CreateUserDto del back
import { reactive, ref } from 'vue'

const datos = reactive({
  first_name: '',
  last_name: '',
  second_last_name: '',
  email: '',
  password: '',
  phone: '',
})
const error = ref('')

function registrarse() {
  // TODO: POST /auth/signup y luego mandarlo al login o dejarlo logueado
  error.value = ''
}
</script>

<template>
  <section class="vista vista-angosta">
    <h1>Crear cuenta</h1>

    <form class="formulario" @submit.prevent="registrarse">
      <label class="campo">
        Nombre
        <input v-model="datos.first_name" placeholder="Ej. Mariana" maxlength="50" required />
      </label>

      <div class="fila">
        <label class="campo">
          Apellido paterno
          <input v-model="datos.last_name" placeholder="Cavazos" maxlength="50" required />
        </label>
        <label class="campo">
          Apellido materno
          <input v-model="datos.second_last_name" placeholder="Lozano" maxlength="50" />
        </label>
      </div>

      <label class="campo">
        Email
        <input v-model="datos.email" type="email" placeholder="usuario@zantedeschia.mx" required />
      </label>

      <label class="campo">
        Contraseña
        <!-- el back pide mínimo 8 caracteres -->
        <input v-model="datos.password" type="password" minlength="8" maxlength="72" required />
      </label>

      <label class="campo">
        Teléfono
        <input v-model="datos.phone" type="tel" placeholder="+52 871 123 4567" maxlength="15" />
      </label>

      <p v-if="error" class="mensaje-error">{{ error }}</p>

      <button type="submit" class="boton">Registrarme</button>
    </form>

    <p class="texto-centro">
      ¿Ya tienes cuenta?
      <RouterLink to="/iniciar-sesion">Inicia sesión</RouterLink>
    </p>
  </section>
</template>
