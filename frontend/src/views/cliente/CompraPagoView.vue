<script setup>
// Le toca a Yuri — issue #29
// Paso 2: método de pago (RF-USER-16), frame "2-Pasarela de Pago: Método de Pago"
// el formulario de la tarjeta lo pone Stripe, aquí solo dejo el lugar
import { useRouter } from 'vue-router'
import { useCarritoStore } from '@/stores/carrito'

const router = useRouter()
const carrito = useCarritoStore()

function pagar() {
  // TODO: confirmar el pago con Stripe (modo prueba) y crear el pedido en el back
  router.push({ name: 'compra-confirmacion', params: { folio: 'pendiente' } })
}
</script>

<template>
  <section class="vista">
    <p class="pasos">1. Entrega → 2. Pago → 3. Confirmación</p>
    <h1>Método de pago</h1>

    <div class="dos-columnas">
      <div class="tarjeta">
        <h2>Tarjeta</h2>
        <!-- aquí se monta el elemento de Stripe -->
        <div id="stripe-tarjeta" class="pendiente">Formulario de Stripe</div>
      </div>

      <aside class="tarjeta">
        <h2>Resumen</h2>
        <p class="fila-entre">
          <span>Piezas</span><span>{{ carrito.totalPiezas }}</span>
        </p>
        <p class="fila-entre">
          <strong>Total</strong><strong>${{ carrito.total }} MXN</strong>
        </p>
        <button type="button" class="boton" @click="pagar">Pagar</button>
      </aside>
    </div>

    <RouterLink to="/compra/entrega">← Regresar a la entrega</RouterLink>
  </section>
</template>
