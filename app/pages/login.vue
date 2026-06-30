<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center"
  >
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
        Travel Agent CMS
      </h1>

      <p class="text-center text-gray-500 mb-8">
        Login sebagai Administrator
      </p>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <input
            v-model="form.email"
            type="email"
            class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="admin@gmail.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            v-model="form.password"
            type="password"
            class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  email: '',
  password: '',
})

const login = async () => {
  try {
    const response = await $fetch(
      'http://localhost:3333/admin/login',
      {
        method: 'POST',
        body: form,
      }
    )

    localStorage.setItem(
      'admin',
      JSON.stringify(response)
    )

    navigateTo('/admin')
  } catch (error) {
    alert('Login gagal')
    console.log(error)
  }
}
</script>