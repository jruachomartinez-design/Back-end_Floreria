<script setup>
// Le toca a Joan — issue #31
// Lista de pedidos con filtros (RF-ADMIN-08, 11)
// los estados son los que acepta el back: reserved, paid, fulfilled
import { reactive, ref } from 'vue'

const estados = { reserved: 'Apartado', paid: 'Pagado', fulfilled: 'Entregado' }
const filtros = reactive({ estado: '', categoria: '', fecha: 'hoy' })
const pedidos = ref([]) // { id, flor, fecha, hora, status }
</script>

<template>
  <section class="vista">
    <header class="encabezado-vista">
      <h1>Pedidos</h1>
    </header>

    <div class="filtros">
      <select v-model="filtros.estado">
        <option value="">Todos los estados</option>
        <option v-for="(texto, clave) in estados" :key="clave" :value="clave">{{ texto }}</option>
      </select>
      <select v-model="filtros.categoria">
        <option value="">Todas las categorías</option>
      </select>
      <select v-model="filtros.fecha">
        <option value="hoy">Hoy</option>
        <option value="manana">Mañana</option>
        <option value="todas">Todas las fechas</option>
      </select>
    </div>

    <table class="tabla">
      <thead>
        <tr>
          <th>Pedido</th>
          <th>Flor</th>
          <th>Entrega</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in pedidos" :key="p.id">
          <td>#{{ p.id }}</td>
          <td>{{ p.flor }}</td>
          <td>{{ p.fecha }} · {{ p.hora }}</td>
          <td>{{ estados[p.status] }}</td>
          <td><RouterLink :to="`/admin/pedidos/${p.id}`">Ver detalle</RouterLink></td>
        </tr>
        <tr v-if="!pedidos.length">
          <td colspan="5" class="pendiente">No hay pedidos con estos filtros</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
