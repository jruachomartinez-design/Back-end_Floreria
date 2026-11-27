<script setup>
// Le toca a Joan — issue #30
// Directorio de clientes, frame "Clientes & Pedidos"
import { ref } from 'vue'

const categoria = ref('')
const clientes = ref([]) // { id, correo, telefono, ultimaOcasion, ultimoArreglo, total }
</script>

<template>
  <section class="vista">
    <header class="encabezado-vista">
      <div>
        <h1>Directorio de clientes</h1>
        <p>Seguimiento de clientes y de lo que han comprado.</p>
      </div>
    </header>

    <div class="filtros">
      <select v-model="categoria">
        <option value="">Todas las compras</option>
      </select>
    </div>

    <table class="tabla">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Teléfono</th>
          <th>Última ocasión y arreglo</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in clientes" :key="c.id">
          <td>{{ c.correo }}</td>
          <td>{{ c.telefono }}</td>
          <td>
            <strong>{{ c.ultimaOcasion }}</strong
            ><br />
            {{ c.ultimoArreglo }}
          </td>
          <td>${{ c.total }} MXN</td>
        </tr>
        <tr v-if="!clientes.length">
          <td colspan="4" class="pendiente">Todavía no hay clientes</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
