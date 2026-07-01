<template>
  <nav class="bg-blue-900 text-white shadow">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">
        Travel Agent
      </h1>

      <div class="space-x-6">
        <NuxtLink to="/" class="hover:text-blue-200">
          Home
        </NuxtLink>

        <NuxtLink to="/packages" class="hover:text-blue-200">
          Paket
        </NuxtLink>

        <NuxtLink to="/reviews" class="hover:text-blue-200">
          Review
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>