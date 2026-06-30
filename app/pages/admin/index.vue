<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const logout = () => {
  localStorage.removeItem('admin')
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-900 text-white p-6">
      <h1 class="text-2xl font-bold mb-10">
        Travel Agent
      </h1>

      <nav class="space-y-4">
        <a href="#" class="block hover:text-blue-300">
          Dashboard
        </a>

        <a href="#" class="block hover:text-blue-300">
          Banner
        </a>

        <a href="#" class="block hover:text-blue-300">
          Paket Traveling
        </a>

        <a href="#" class="block hover:text-blue-300">
          Review Customer
        </a>

        <button
          @click="logout"
          class="mt-10 text-red-300 hover:text-red-500"
        >
          Logout
        </button>
      </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-10">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">
        Dashboard Admin
      </h1>

      <p class="text-gray-600 mb-8">
        Selamat datang di CMS Travel Agent.
      </p>

      <div class="grid grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-gray-500">Banner</h2>
          <p class="text-4xl font-bold mt-3">0</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-gray-500">Paket Traveling</h2>
          <p class="text-4xl font-bold mt-3">0</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-gray-500">Review Customer</h2>
          <p class="text-4xl font-bold mt-3">0</p>
        </div>
      </div>
    </main>
  </div>
</template>