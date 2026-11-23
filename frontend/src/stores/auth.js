import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Store de la sesión — Yuri
// Por ahora solo guarda el token y el usuario en localStorage,
// falta conectarlo con el endpoint de login del back (issues #18 a #20)
export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const usuario = ref(JSON.parse(localStorage.getItem('usuario') || 'null'))

  const estaLogueado = computed(() => !!token.value)
  // TODO: confirmar cómo viene el rol en la respuesta del back
  const esAdmin = computed(() => estaLogueado.value && usuario.value?.rol === 'admin')

  function guardarSesion(nuevoToken, datosUsuario) {
    token.value = nuevoToken
    usuario.value = datosUsuario
    localStorage.setItem('token', nuevoToken)
    localStorage.setItem('usuario', JSON.stringify(datosUsuario))
  }

  function cerrarSesion() {
    token.value = null
    usuario.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  return { token, usuario, estaLogueado, esAdmin, guardarSesion, cerrarSesion }
})
