<script setup>
// Le toca a Yuri — issue #25
// Inicio, frame "Vista Inicial" del Figma: banner, destacados y accesos al catálogo
import { ref } from 'vue'

const destacados = ref([]) // { id, name, price, image_url }
const ocasiones = ref([]) // categorías para los accesos rápidos
</script>

<template>
  <section class="vista">
    <div class="banner">
      <h1>Flores para cada momento</h1>
      <p>Arreglos florales en Torreón con entrega a domicilio.</p>
      <RouterLink to="/flores" class="boton">Ver catálogo</RouterLink>
    </div>

    <h2>Compra por ocasión</h2>
    <div class="chips">
      <RouterLink v-for="o in ocasiones" :key="o.id" :to="`/flores?categoria=${o.id}`" class="chip">
        {{ o.name }}
      </RouterLink>
      <p v-if="!ocasiones.length" class="pendiente">Sin categorías todavía</p>
    </div>

    <h2>Destacados</h2>
    <div class="tarjetas">
      <RouterLink v-for="p in destacados" :key="p.id" :to="`/flores/${p.id}`" class="tarjeta">
        <img :src="p.image_url" :alt="p.name" />
        <h3>{{ p.name }}</h3>
        <p>${{ p.price }} MXN</p>
      </RouterLink>
      <p v-if="!destacados.length" class="pendiente">Sin productos destacados</p>
    </div>
  </section>
</template>
