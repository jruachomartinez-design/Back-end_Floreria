<script setup>
// Le toca a Yuri — issue #31
// Historial de pedidos del cliente, frame "Pedidos"
import { ref } from 'vue'

const estados = { reserved: 'Apartado', paid: 'Pagado', fulfilled: 'Entregado' }
const pedidos = ref([]) // { id, fecha, total, status, productos }
</script>

<template>
  <section class="vista">
    <h1>Mis pedidos</h1>

    <div class="lista">
      <article v-for="p in pedidos" :key="p.id" class="tarjeta">
        <div class="fila-entre">
          <h3>Pedido #{{ p.id }}</h3>
          <span>{{ estados[p.status] }}</span>
        </div>
        <p>Entrega: {{ p.fecha }}</p>
        <p>Total: ${{ p.total }} MXN</p>
      </article>
    </div>

    <p v-if="!pedidos.length" class="pendiente">
      Aún no tienes pedidos. <RouterLink to="/flores">Ver flores</RouterLink>
    </p>
  </section>
</template>
