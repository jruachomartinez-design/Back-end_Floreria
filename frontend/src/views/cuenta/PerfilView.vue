<script setup>
// Le toca a Yuri — issue #27
// Mi perfil (RF-USER-12, 14, 17), frame "Mi Perfil" del Figma
// en el figma viene junto con las pantallas del cliente, por eso es de Yuri
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const datos = reactive({
  first_name: auth.usuario?.first_name ?? '',
  last_name: auth.usuario?.last_name ?? '',
  second_last_name: auth.usuario?.second_last_name ?? '',
  email: auth.usuario?.email ?? '',
  phone: auth.usuario?.phone ?? '',
})

function guardar() {
  // TODO: PATCH /users/:id
}

function salir() {
  auth.cerrarSesion()
  router.push({ name: 'inicio' })
}
</script>

<template>
  <section class="vista">
    <h1>Mi perfil</h1>

    <div class="dos-columnas">
      <form class="formulario" @submit.prevent="guardar">
        <h2>Datos personales</h2>
        <label class="campo">Nombre <input v-model="datos.first_name" /></label>
        <label class="campo">Apellido paterno <input v-model="datos.last_name" /></label>
        <label class="campo">Apellido materno <input v-model="datos.second_last_name" /></label>
        <label class="campo">Correo <input v-model="datos.email" type="email" /></label>
        <label class="campo">Teléfono <input v-model="datos.phone" type="tel" /></label>
        <button type="submit" class="boton">Guardar cambios</button>
      </form>

      <aside class="tarjeta">
        <h2>Mis direcciones</h2>
        <!-- TODO: listar las direcciones guardadas (customer_addresses) -->
        <p class="pendiente">Aún no hay direcciones</p>

        <button type="button" class="boton-secundario" @click="salir">Cerrar sesión</button>
      </aside>
    </div>
  </section>
</template>
