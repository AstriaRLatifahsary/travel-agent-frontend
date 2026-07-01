<script setup lang="ts">
defineProps({
  pkg: Object,
})

const orderPackage = () => {
  window.open(
    'https://wa.me/6281234567890?text=Saya tertarik dengan paket wisata ini.',
    '_blank'
  )
}
</script>

<template>
  <div
    class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
  >
    <img
      :src="pkg.image"
      class="w-full h-60 object-cover"
    />

    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">
        {{ pkg.title }}
      </h2>

      <div class="space-y-2 text-gray-600 mb-5">
        <p>📍 {{ pkg.destination }}</p>
        <p>🕒 {{ pkg.duration }}</p>
        <p>👥 Kuota {{ pkg.quota }} Orang</p>
        <p>🏨 {{ pkg.facilities }}</p>
      </div>

      <p
        class="text-blue-600 text-2xl font-bold mb-6"
      >
        Rp {{ pkg.price }}
      </p>

      <div class="flex gap-3">
        <NuxtLink
          :to="`/packages/${pkg.id}`"
          class="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Detail
        </NuxtLink>

        <button
          @click="orderPackage"
          class="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  </div>
</template>