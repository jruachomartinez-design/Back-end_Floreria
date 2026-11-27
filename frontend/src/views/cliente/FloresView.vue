<script setup>
// Le toca a Yuri — issue #26
// Catálogo con buscador y filtros (RF-USER-02), frame "Catálogo de Flores & Filtros"
import { reactive, ref } from 'vue'

const filtros = reactive({ busqueda: '', categoria: '', orden: '' })
const categorias = ref([])
const productos = ref([]) // { id, name, price, image_url, is_available }
</script>

<template>
  <section class="vista">
    <h1>Flores</h1>

    <div class="con-lateral">
      <aside class="filtros-lateral">
        <input v-model="filtros.busqueda" class="buscador" placeholder="Buscar flores..." />
        <label class="campo">
          Categoría
          <select v-model="filtros.categoria">
            <option value="">Todas</option>
            <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </label>
        <label class="campo">
          Ordenar por
          <select v-model="filtros.orden">
            <option value="">Relevancia</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
          </select>
        </label>
      </aside>

      <div class="tarjetas">
        <RouterLink v-for="p in productos" :key="p.id" :to="`/flores/${p.id}`" class="tarjeta">
          <img :src="p.image_url" :alt="p.name" />
          <h3>{{ p.name }}</h3>
          <p>${{ p.price }} MXN</p>
          <p v-if="!p.is_available" class="mensaje-error">Agotado</p>
        </RouterLink>
        <p v-if="!productos.length" class="pendiente">No hay flores que mostrar</p>
      </div>
    </div>
  </section>
</template>
