<script setup>
// Le toca a Yuri — issue #26
// Favoritos del cliente, frame "Favoritos"
import { ref } from 'vue'

const favoritos = ref([]) // productos

function quitar(id) {
  // TODO: DELETE /product-favorites/:id
  favoritos.value = favoritos.value.filter((f) => f.id !== id)
}
</script>

<template>
  <section class="vista">
    <h1>Favoritos</h1>

    <div class="tarjetas">
      <article v-for="f in favoritos" :key="f.id" class="tarjeta">
        <img :src="f.image_url" :alt="f.name" />
        <RouterLink :to="`/flores/${f.id}`"
          ><h3>{{ f.name }}</h3></RouterLink
        >
        <p>${{ f.price }} MXN</p>
        <button type="button" class="boton-secundario" @click="quitar(f.id)">Quitar</button>
      </article>
    </div>

    <p v-if="!favoritos.length" class="pendiente">
      Aún no tienes favoritos. <RouterLink to="/flores">Ver flores</RouterLink>
    </p>
  </section>
</template>
