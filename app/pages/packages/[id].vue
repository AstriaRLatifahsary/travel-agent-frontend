<script setup lang="ts">
const route = useRoute()

const { data: pkg } =
  await useFetch(
    `http://localhost:3333/admin/travel-packages/${route.params.id}`
  )

const orderPackage = () => {
  window.open(
    `https://wa.me/6281234567890?text=Saya tertarik dengan ${pkg.value.title}`,
    '_blank'
  )
}
</script>

<template>
  <div
    v-if="pkg"
    class="container mx-auto py-16 px-6"
  >
    <NuxtLink
    to="/packages"
    class="
        inline-flex items-center
        gap-2
        bg-gray-100
        px-4 py-2
        rounded-lg
        mb-8
        hover:bg-gray-200
    "
    >
    ← Kembali
    </NuxtLink>

    <img
      :src="pkg.image"
      class="w-full h-[500px] object-cover rounded-3xl mb-10"
    />

    <h1
      class="text-5xl font-bold mb-6"
    >
      {{ pkg.title }}
    </h1>

    <div
      class="space-y-3 text-lg text-gray-600 mb-8"
    >
      <p>📍 {{ pkg.destination }}</p>
      <p>🕒 {{ pkg.duration }}</p>
      <p>👥 Kuota {{ pkg.quota }}</p>
      <p>🏨 {{ pkg.facilities }}</p>
    </div>

    <p class="text-gray-700 mb-8">
      {{ pkg.description }}
    </p>

    <p
      class="text-4xl text-blue-600 font-bold mb-10"
    >
      Rp {{ pkg.price }}
    </p>

    <button
      @click="orderPackage"
      class="bg-green-500 text-white px-8 py-4 rounded-xl"
    >
      Pesan Sekarang
    </button>
  </div>
</template>