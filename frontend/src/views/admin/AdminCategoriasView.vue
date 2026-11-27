<script setup>
// Le toca a Joan — issue #30
// Categorías (alta, edición y baja), frames "categorias" y el modal "Añadir Nueva Categoría"
import { reactive, ref } from 'vue'

const busqueda = ref('')
const categorias = ref([]) // { id, name, description, activa }

const mostrarModal = ref(false)
const categoria = reactive({ id: null, name: '', activa: true, variedades: [], description: '' })

function nueva() {
  Object.assign(categoria, { id: null, name: '', activa: true, variedades: [], description: '' })
  mostrarModal.value = true
}

function guardar() {
  // TODO: POST /categories o PATCH /categories/:id
  // ojo: en el back la tabla solo tiene name y description, lo de activa/variedades hay que platicarlo
  mostrarModal.value = false
}
</script>

<template>
  <section class="vista">
    <header class="encabezado-vista">
      <div>
        <h1>Categorías</h1>
        <p>
          Configura las fechas especiales, campañas de temporada y las flores de cada categoría.
        </p>
      </div>
      <button type="button" class="boton" @click="nueva">Añadir nueva categoría</button>
    </header>

    <input
      v-model="busqueda"
      class="buscador"
      placeholder="Buscar ocasiones, flores, campañas..."
    />

    <div class="tarjetas">
      <article v-for="c in categorias" :key="c.id" class="tarjeta">
        <h3>{{ c.name }}</h3>
        <p>{{ c.description }}</p>
      </article>
      <p v-if="!categorias.length" class="pendiente">No hay categorías registradas</p>
    </div>

    <!-- modal sencillo, si luego hacemos un componente Modal lo cambiamos -->
    <div v-if="mostrarModal" class="fondo-modal" @click.self="mostrarModal = false">
      <form class="formulario tarjeta modal" @submit.prevent="guardar">
        <h2>Añadir nueva categoría</h2>
        <label class="campo">
          Nombre de la categoría *
          <input
            v-model="categoria.name"
            placeholder="Ej. Día de las Madres, Graduaciones..."
            maxlength="50"
            required
          />
        </label>
        <fieldset class="campo">
          <legend>Estado de la campaña</legend>
          <label class="check"
            ><input v-model="categoria.activa" type="radio" :value="true" /> Activa</label
          >
          <label class="check"
            ><input v-model="categoria.activa" type="radio" :value="false" /> Inactiva</label
          >
        </fieldset>
        <label class="campo">
          Asignar variedades de flor
          <!-- TODO: aquí va un buscador de productos para ir agregándolos -->
          <input placeholder="Buscar flor por nombre o color..." />
        </label>
        <label class="campo">
          Descripción o nota comercial (opcional)
          <textarea
            v-model="categoria.description"
            rows="3"
            maxlength="255"
            placeholder="Fechas clave, recomendaciones de empaque..."
          ></textarea>
        </label>
        <div class="fila-entre">
          <button type="button" class="boton-secundario" @click="mostrarModal = false">
            Cancelar
          </button>
          <button type="submit" class="boton">Guardar</button>
        </div>
      </form>
    </div>
  </section>
</template>
