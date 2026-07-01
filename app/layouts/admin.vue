<template>
  <div class="min-h-screen flex">

    <aside class="w-64 bg-gray-900 text-white p-6">
      <h1 class="text-2xl font-bold mb-8">
        CMS Admin
      </h1>

      <div class="space-y-4">
        <NuxtLink
          to="/admin"
          class="block hover:text-blue-400"
        >
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/admin/banner"
          class="block hover:text-blue-400"
        >
          Banner
        </NuxtLink>

        <NuxtLink
          to="/admin/travel-packages"
          class="block hover:text-blue-400"
        >
          Paket Traveling
        </NuxtLink>

        <NuxtLink
          to="/admin/reviews"
          class="block hover:text-blue-400"
        >
          Review Customer
        </NuxtLink>
      </div>
    </aside>

    <main class="flex-1 p-8">
      <slot />
    </main>

  </div>
</template>