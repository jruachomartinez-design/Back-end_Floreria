import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Store del carrito — Yuri, issue #28
// De momento vive solo en el front, luego vemos si se guarda en el back
export const useCarritoStore = defineStore('carrito', () => {
  const productos = ref([]) // { id, name, price, cantidad } (los mismos nombres que regresa el back)

  const totalPiezas = computed(() => productos.value.reduce((suma, p) => suma + p.cantidad, 0))
  const total = computed(() => productos.value.reduce((suma, p) => suma + p.price * p.cantidad, 0))

  function agregar(producto, cantidad = 1) {
    const yaEsta = productos.value.find((p) => p.id === producto.id)
    if (yaEsta) {
      yaEsta.cantidad += cantidad
    } else {
      productos.value.push({ ...producto, cantidad })
    }
  }

  function quitar(id) {
    productos.value = productos.value.filter((p) => p.id !== id)
  }

  function vaciar() {
    productos.value = []
  }

  return { productos, totalPiezas, total, agregar, quitar, vaciar }
})
