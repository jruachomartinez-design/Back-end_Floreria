<script setup>
// Le toca a Yuri — issue #25
// Nosotros, frame "Nosotros": historia de la florería, sucursales y WhatsApp
// TODO: poner las sucursales reales y el número de WhatsApp
const sucursales = []
</script>

<template>
  <section class="vista">
    <h1>Nosotros</h1>

    <article>
      <h2>Nuestra historia</h2>
      <p class="pendiente">Texto de la florería pendiente</p>
    </article>

    <h2>Sucursales</h2>
    <div class="tarjetas">
      <article v-for="s in sucursales" :key="s.nombre" class="tarjeta">
        <h3>{{ s.nombre }}</h3>
        <p>{{ s.direccion }}</p>
        <p>{{ s.horario }}</p>
      </article>
      <p v-if="!sucursales.length" class="pendiente">Sin sucursales capturadas</p>
    </div>

    <a href="#" class="boton">Escríbenos por WhatsApp</a>
  </section>
</template>
