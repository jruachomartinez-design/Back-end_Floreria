<script setup>
// Le toca a Joan — issue #30
// Inventario floral (RF-ADMIN-03 a 07, 12), frames "Inventario Floral" y el formulario de flor
import { reactive, ref } from 'vue'

const filtros = reactive({ categoria: '', disponibilidad: '', color: '' })
const colores = ['Rosa', 'Blanco', 'Amarillo', 'Azul', 'Rojo', 'Morado', 'Naranja']

const productos = ref([]) // { id, name, price, stock, is_available, category }
const categorias = ref([])

// el formulario de alta/edición lo pongo aquí mismo, se abre arriba de la tabla
const mostrarFormulario = ref(false)
const producto = reactive({
  id: null,
  name: '',
  stock: 0,
  is_available: true,
  price: 0,
  description: '',
  category_id: '',
})

function nuevo() {
  Object.assign(producto, {
    id: null,
    name: '',
    stock: 0,
    is_available: true,
    price: 0,
    description: '',
    category_id: '',
  })
  mostrarFormulario.value = true
}

function editar(p) {
  Object.assign(producto, p)
  mostrarFormulario.value = true
}

function guardar() {
  // TODO: POST /products si es nuevo, PATCH /products/:id si ya existe
  mostrarFormulario.value = false
}

function eliminar(id) {
  // TODO: DELETE /products/:id, preguntar antes
  console.log('eliminar', id)
}
</script>

<template>
  <section class="vista">
    <header class="encabezado-vista">
      <h1>Inventario floral</h1>
      <button type="button" class="boton" @click="nuevo">Agregar flor</button>
    </header>

    <div class="filtros">
      <select v-model="filtros.categoria">
        <option value="">Todas las categorías</option>
        <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
      <select v-model="filtros.disponibilidad">
        <option value="">Cualquier disponibilidad</option>
        <option value="si">Disponible</option>
        <option value="no">Agotado</option>
      </select>
      <div class="chips">
        <span>Color:</span>
        <button
          v-for="color in colores"
          :key="color"
          type="button"
          class="chip"
          :class="{ activo: filtros.color === color }"
          @click="filtros.color = filtros.color === color ? '' : color"
        >
          {{ color }}
        </button>
      </div>
    </div>

    <form v-if="mostrarFormulario" class="formulario tarjeta" @submit.prevent="guardar">
      <h2>{{ producto.id ? 'Editar flor' : 'Nueva flor' }}</h2>
      <div class="fila">
        <label class="campo"
          >Tipo de flor
          <input v-model="producto.name" placeholder="Ej. Rosas rojas, Tulipanes..." required
        /></label>
        <label class="campo"
          >Cantidad
          <input v-model.number="producto.stock" type="number" min="0" placeholder="Ej. 24 tallos"
        /></label>
      </div>
      <div class="fila">
        <label class="campo">
          Estado
          <select v-model="producto.is_available">
            <option :value="true">Disponible</option>
            <option :value="false">No disponible</option>
          </select>
        </label>
        <label class="campo"
          >Precio <input v-model.number="producto.price" type="number" min="0" step="0.01"
        /></label>
      </div>
      <label class="campo">
        Categoría
        <select v-model="producto.category_id" required>
          <option value="" disabled>Elige una</option>
          <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </label>
      <label class="campo">
        Descripción
        <textarea
          v-model="producto.description"
          rows="3"
          placeholder="Describe el arreglo floral, follajes, presentación..."
        ></textarea>
      </label>
      <div class="fila-entre">
        <button type="button" class="boton-secundario" @click="mostrarFormulario = false">
          Cancelar
        </button>
        <button type="submit" class="boton">Guardar</button>
      </div>
    </form>

    <table class="tabla">
      <thead>
        <tr>
          <th>Flor</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Disponibilidad</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id">
          <td>{{ p.name }}</td>
          <td>${{ p.price }} MXN</td>
          <td>{{ p.stock }}</td>
          <td>{{ p.is_available ? 'Disponible' : 'Agotado' }}</td>
          <td>
            <button type="button" class="boton-secundario" @click="editar(p)">Editar</button>
            <button type="button" class="boton-secundario" @click="eliminar(p.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="!productos.length">
          <td colspan="5" class="pendiente">No hay flores registradas</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
