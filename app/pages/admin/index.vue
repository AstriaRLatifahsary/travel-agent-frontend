<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})
</script>

<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold mb-8">
      Dashboard Admin
    </h1>

    <div class="grid md:grid-cols-3 gap-6">

      <NuxtLink
        to="/admin/banner"
        class="p-8 bg-blue-500 text-white rounded-xl"
      >
        Manage Banner
      </NuxtLink>

      <NuxtLink
        to="/admin/travel-packages"
        class="p-8 bg-green-500 text-white rounded-xl"
      >
        Manage Paket
      </NuxtLink>

      <NuxtLink
        to="/admin/reviews"
        class="p-8 bg-yellow-500 text-white rounded-xl"
      >
        Manage Review
      </NuxtLink>

    </div>
  </div>
</template>