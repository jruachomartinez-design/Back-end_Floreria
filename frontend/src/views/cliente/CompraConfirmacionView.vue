<script setup>
// Le toca a Yuri — issue #29
// Paso 3: confirmación con el folio del pedido (RF-USER-18)
// no viene en el figma, la dejo sencilla
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="vista vista-angosta texto-centro">
    <p class="pasos">1. Entrega → 2. Pago → 3. Confirmación</p>
    <h1>¡Gracias por tu compra!</h1>
    <p>
      Tu número de pedido es <strong>{{ route.params.folio }}</strong>
    </p>
    <p>Te avisaremos cuando tu arreglo vaya en camino.</p>

    <div class="fila">
      <RouterLink to="/pedidos" class="boton">Ver mis pedidos</RouterLink>
      <RouterLink to="/flores" class="boton-secundario">Seguir comprando</RouterLink>
    </div>
  </section>
</template>
