<script setup>
// Le toca a Yuri — issue #29
// Paso 1 de la compra: dirección de entrega (RF-USER-10, 13)
// frame "1-Pasarela de Pago: Dirección de Entrega"
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const direccionesGuardadas = ref([])
const direccionElegida = ref(null)
const entrega = reactive({
  destinatario: '',
  telefono: '',
  calle: '',
  colonia: '',
  codigo_postal: '',
  fecha: '',
  dedicatoria: '',
})

function continuar() {
  // TODO: guardar la dirección/entrega (store o back) antes de pasar al pago
  router.push({ name: 'compra-pago' })
}
</script>

<template>
  <section class="vista">
    <p class="pasos">1. Entrega → 2. Pago → 3. Confirmación</p>
    <h1>Dirección de entrega</h1>

    <form class="formulario" @submit.prevent="continuar">
      <fieldset v-if="direccionesGuardadas.length" class="campo">
        <legend>Mis direcciones</legend>
        <label v-for="d in direccionesGuardadas" :key="d.id" class="check">
          <input v-model="direccionElegida" type="radio" :value="d.id" /> {{ d.calle }}
        </label>
      </fieldset>

      <div class="fila">
        <label class="campo"
          >Nombre de quien recibe <input v-model="entrega.destinatario" required
        /></label>
        <label class="campo"
          >Teléfono del cliente * <input v-model="entrega.telefono" type="tel" required
        /></label>
      </div>
      <label class="campo">Calle y número <input v-model="entrega.calle" required /></label>
      <div class="fila">
        <label class="campo">Colonia <input v-model="entrega.colonia" required /></label>
        <label class="campo"
          >Código postal <input v-model="entrega.codigo_postal" maxlength="10" required
        /></label>
      </div>
      <label class="campo"
        >Fecha de entrega <input v-model="entrega.fecha" type="date" required
      /></label>
      <label class="campo">
        Dedicatoria (opcional)
        <textarea v-model="entrega.dedicatoria" rows="3"></textarea>
      </label>

      <div class="fila-entre">
        <RouterLink to="/carrito">← Regresar al carrito</RouterLink>
        <button type="submit" class="boton">Continuar al pago</button>
      </div>
    </form>
  </section>
</template>
