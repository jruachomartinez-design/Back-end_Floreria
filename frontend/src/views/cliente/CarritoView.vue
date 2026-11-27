<script setup>
// Le toca a Yuri — issue #28
// Carrito (RF-USER-04 a 09), frame "Carrito de Compras"
import { useCarritoStore } from '@/stores/carrito'

const carrito = useCarritoStore()
</script>

<template>
  <section class="vista">
    <h1>Carrito</h1>

    <div v-if="carrito.productos.length" class="dos-columnas">
      <ul class="lista">
        <li v-for="p in carrito.productos" :key="p.id" class="fila-entre">
          <span>{{ p.name }}</span>
          <input v-model.number="p.cantidad" type="number" min="1" class="cantidad" />
          <span>${{ p.price * p.cantidad }} MXN</span>
          <button type="button" class="boton-secundario" @click="carrito.quitar(p.id)">
            Quitar
          </button>
        </li>
      </ul>

      <aside class="tarjeta">
        <h2>Resumen</h2>
        <p class="fila-entre">
          <span>Piezas</span><span>{{ carrito.totalPiezas }}</span>
        </p>
        <p class="fila-entre">
          <strong>Total</strong><strong>${{ carrito.total }} MXN</strong>
        </p>
        <RouterLink to="/compra/entrega" class="boton">Continuar con la compra</RouterLink>
      </aside>
    </div>

    <p v-else class="pendiente">
      Tu carrito está vacío. <RouterLink to="/flores">Ver flores</RouterLink>
    </p>
  </section>
</template>
