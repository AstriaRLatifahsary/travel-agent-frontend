<script setup lang="ts">
const { data: packages } = await useFetch(
  'http://localhost:3333/admin/travel-packages'
)
</script>

<template>
  <div class="container mx-auto py-10 px-6">
    <h1
      class="
        text-4xl
        font-bold
        text-slate-900
        mb-10
      "
    >
      Paket Traveling
    </h1>

    <div class="grid md:grid-cols-3 gap-8">
      <NuxtLink
        v-for="pkg in packages"
        :key="pkg.id"
        :to="`/packages/${pkg.id}`"
        class="block"
      >
        <PackageCard
          :pkg="pkg"
        />
      </NuxtLink>
    </div>
  </div>
</template>