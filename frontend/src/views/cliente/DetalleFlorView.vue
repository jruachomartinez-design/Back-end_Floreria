<script setup>
// Le toca a Yuri — issue #26
// Detalle de producto (RF-USER-03), frame "Detalle de Producto"
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCarritoStore } from '@/stores/carrito'

const route = useRoute()
const carrito = useCarritoStore()

// TODO: GET /products/:id con route.params.id
const producto = ref({
  id: route.params.id,
  name: '',
  description: '',
  price: 0,
  image_url: '',
  is_available: true,
})
const cantidad = ref(1)

function agregarAlCarrito() {
  carrito.agregar(producto.value, cantidad.value)
}

function agregarAFavoritos() {
  // TODO: POST /product-favorites
}
</script>

<template>
  <section class="vista">
    <RouterLink to="/flores">← Volver al catálogo</RouterLink>

    <div class="dos-columnas">
      <img :src="producto.image_url" :alt="producto.name" class="foto-producto" />

      <div>
        <h1>{{ producto.name || 'Nombre de la flor' }}</h1>
        <p class="dato">${{ producto.price }} MXN</p>
        <p>{{ producto.is_available ? 'Disponible' : 'Agotado' }}</p>
        <p>{{ producto.description }}</p>

        <label class="campo">
          Cantidad
          <input v-model.number="cantidad" type="number" min="1" />
        </label>

        <div class="fila">
          <button
            type="button"
            class="boton"
            :disabled="!producto.is_available"
            @click="agregarAlCarrito"
          >
            Agregar al carrito
          </button>
          <button type="button" class="boton-secundario" @click="agregarAFavoritos">
            ♡ Favoritos
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
