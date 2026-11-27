import { useAuthStore } from '@/stores/auth'

// Helper para pegarle al back, lo usamos las dos
// La URL se pone en el .env (ver .env.example)
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function api(ruta, opciones = {}) {
  const auth = useAuthStore()
  const headers = { 'Content-Type': 'application/json', ...opciones.headers }

  if (auth.token) {
    headers.Authorization = `Bearer ${auth.token}`
  }

  const respuesta = await fetch(`${API_URL}${ruta}`, { ...opciones, headers })

  if (!respuesta.ok) {
    // el mensaje de error lo mostramos en la vista que llame (#33)
    const error = await respuesta.json().catch(() => ({}))
    throw new Error(error.message || `Error ${respuesta.status}`)
  }

  // algunos endpoints (como DELETE) no regresan nada
  return respuesta.status === 204 ? null : respuesta.json()
}
