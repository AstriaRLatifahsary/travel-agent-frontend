export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const admin =
      localStorage.getItem('admin')

    if (!admin) {
      return navigateTo('/login')
    }
  }
})