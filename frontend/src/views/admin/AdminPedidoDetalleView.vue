<script setup>
// Le toca a Joan — issue #31
// Detalle del pedido y cambio de estado (RF-ADMIN-09, 11), frame "Detalle de Orden"
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const idPedido = route.params.id

// TODO: GET /orders/:id al cargar
const pedido = ref({ cliente: null, ocasion: '', fecha: '', productos: [], status: 'reserved' })

function cambiarEstado(nuevo) {
  // TODO: PATCH /orders/:id con el nuevo status
  pedido.value.status = nuevo
}

function avisarPorWhatsApp() {
  // TODO: armar el link de wa.me con el teléfono del cliente
}
</script>

<template>
  <section class="vista">
    <RouterLink to="/admin/pedidos">← Volver a pedidos</RouterLink>
    <h1>Pedido #{{ idPedido }}</h1>

    <div class="dos-columnas">
      <article class="tarjeta">
        <h2>Cliente</h2>
        <dl class="datos">
          <dt>Nombre</dt>
          <dd>{{ pedido.cliente?.nombre ?? '—' }}</dd>
          <dt>Correo</dt>
          <dd>{{ pedido.cliente?.correo ?? '—' }}</dd>
          <dt>Teléfono</dt>
          <dd>{{ pedido.cliente?.telefono ?? '—' }}</dd>
        </dl>
      </article>

      <article class="tarjeta">
        <h2>Pedido</h2>
        <dl class="datos">
          <dt>Ocasión</dt>
          <dd>{{ pedido.ocasion || '—' }}</dd>
          <dt>Fecha de entrega</dt>
          <dd>{{ pedido.fecha || '—' }}</dd>
        </dl>
        <label class="campo">
          Estado
          <select :value="pedido.status" @change="cambiarEstado($event.target.value)">
            <option value="reserved">Apartado</option>
            <option value="paid">Pagado</option>
            <option value="fulfilled">Entregado</option>
          </select>
        </label>
      </article>
    </div>

    <article class="tarjeta">
      <h2>Productos</h2>
      <ul v-if="pedido.productos.length">
        <li v-for="p in pedido.productos" :key="p.id">{{ p.cantidad }} × {{ p.nombre }}</li>
      </ul>
      <p v-else class="pendiente">Sin productos</p>
    </article>

    <article class="tarjeta">
      <h2>Recordatorio al cliente</h2>
      <p>Envía una notificación para avisarle al cliente sobre su arreglo.</p>
      <button type="button" class="boton" @click="avisarPorWhatsApp">
        Enviar recordatorio por WhatsApp
      </button>
    </article>
  </section>
</template>
