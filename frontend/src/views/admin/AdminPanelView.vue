<script setup>
// Le toca a Joan — issue #30
// Panel general (RF-ADMIN-10, 14), frame "Vista del Administrador"
import { ref } from 'vue'

// por ahora en ceros, luego se llenan con lo que regrese el back
const resumen = ref({ transacciones: 0, entregados: 0, ganancias: 0, promedio: 0 })
const alertasStock = ref([]) // { flor, mensaje }
const clientesRecientes = ref([]) // { correo, fecha }
</script>

<template>
  <section class="vista">
    <header class="encabezado-vista">
      <div>
        <h1>Panel general</h1>
        <p>Gestión operativa floral, consolidado en tiempo real y flujo de ventas diarias.</p>
      </div>
    </header>

    <div class="tarjetas">
      <article class="tarjeta">
        <h3>Transacciones registradas</h3>
        <p class="dato">{{ resumen.transacciones }}</p>
      </article>
      <article class="tarjeta">
        <h3>Entregados / Recogidos</h3>
        <p class="dato">{{ resumen.entregados }}</p>
      </article>
      <article class="tarjeta">
        <h3>Total de ganancias</h3>
        <p class="dato">${{ resumen.ganancias }} MXN</p>
        <p>Promedio por pedido: ${{ resumen.promedio }} MXN</p>
      </article>
    </div>

    <div class="dos-columnas">
      <article class="tarjeta">
        <h2>Alertas de inventario</h2>
        <p>Flores que requieren reposición urgente.</p>
        <ul v-if="alertasStock.length">
          <li v-for="alerta in alertasStock" :key="alerta.flor">
            <strong>{{ alerta.flor }}</strong> — {{ alerta.mensaje }}
          </li>
        </ul>
        <p v-else class="pendiente">Sin alertas</p>
        <RouterLink to="/admin/productos">Ver inventario</RouterLink>
      </article>

      <article class="tarjeta">
        <h2>Últimos registros</h2>
        <p>Clientes recientes creados en la plataforma.</p>
        <ul v-if="clientesRecientes.length">
          <li v-for="cliente in clientesRecientes" :key="cliente.correo">{{ cliente.correo }}</li>
        </ul>
        <p v-else class="pendiente">Sin registros todavía</p>
        <RouterLink to="/admin/clientes">Ver clientes</RouterLink>
      </article>
    </div>
  </section>
</template>
