<script setup lang="ts">
import {
  Images,
  Plane,
  MessageSquare,
} from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

const { data: banners } =
  await useFetch(
    'http://localhost:3333/admin/banners'
  )

const { data: packages } =
  await useFetch(
    'http://localhost:3333/admin/travel-packages'
  )

const { data: reviews } =
  await useFetch(
    'http://localhost:3333/admin/reviews'
  )
</script>

<template>
  <div class="p-10 bg-slate-50 min-h-screen">
    <!-- Header -->
    <div class="mb-12">
      <p
        class="
          text-blue-600
          font-semibold
          tracking-[4px]
          uppercase
          mb-2
        "
      >
        Admin Panel
      </p>

      <h1
        class="
          text-4xl
          font-bold
          text-slate-900
        "
      >
        Dashboard Admin
      </h1>

      <p
        class="
          text-slate-500
          mt-3
        "
      >
        Selamat datang di dashboard pengelolaan website Travel Agent.
      </p>
    </div>

    <!-- Statistics -->
    <div
      class="
        grid
        md:grid-cols-3
        gap-6
        mb-12
      "
    >
      <!-- Banner -->
      <div
        class="
          bg-white
          rounded-[28px]
          p-7
          shadow-sm
          border
          border-slate-100
        "
      >
        <div
          class="
            flex
            justify-between
            items-start
          "
        >
          <div>
            <p
              class="
                text-slate-500
                text-sm
              "
            >
              Total Banner
            </p>

            <h2
              class="
                text-4xl
                font-bold
                text-slate-900
                mt-3
              "
            >
              {{ banners?.length || 0 }}
            </h2>
          </div>

          <div
            class="
              w-14
              h-14
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
            "
          >
            <Images
              class="
                w-7
                h-7
                text-blue-600
              "
            />
          </div>
        </div>
      </div>

      <!-- Paket -->
      <div
        class="
          bg-white
          rounded-[28px]
          p-7
          shadow-sm
          border
          border-slate-100
        "
      >
        <div
          class="
            flex
            justify-between
            items-start
          "
        >
          <div>
            <p
              class="
                text-slate-500
                text-sm
              "
            >
              Total Paket Wisata
            </p>

            <h2
              class="
                text-4xl
                font-bold
                text-slate-900
                mt-3
              "
            >
              {{ packages?.length || 0 }}
            </h2>
          </div>

          <div
            class="
              w-14
              h-14
              rounded-2xl
              bg-green-100
              flex
              items-center
              justify-center
            "
          >
            <Plane
              class="
                w-7
                h-7
                text-green-600
              "
            />
          </div>
        </div>
      </div>

      <!-- Review -->
      <div
        class="
          bg-white
          rounded-[28px]
          p-7
          shadow-sm
          border
          border-slate-100
        "
      >
        <div
          class="
            flex
            justify-between
            items-start
          "
        >
          <div>
            <p
              class="
                text-slate-500
                text-sm
              "
            >
              Total Review
            </p>

            <h2
              class="
                text-4xl
                font-bold
                text-slate-900
                mt-3
              "
            >
              {{ reviews?.length || 0 }}
            </h2>
          </div>

          <div
            class="
              w-14
              h-14
              rounded-2xl
              bg-yellow-100
              flex
              items-center
              justify-center
            "
          >
            <MessageSquare
              class="
                w-7
                h-7
                text-yellow-500
              "
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <h2
      class="
        text-2xl
        font-bold
        text-slate-900
        mb-6
      "
    >
      Menu Management
    </h2>

    <div
      class="
        grid
        md:grid-cols-3
        gap-6
      "
    >
      <!-- Banner -->
      <NuxtLink
        to="/admin/banner"
        class="
          bg-white
          rounded-[28px]
          p-8
          shadow-sm
          border
          border-slate-100
          hover:-translate-y-2
          hover:shadow-xl
          transition-all
        "
      >
        <Images
          class="
            w-10
            h-10
            text-blue-600
            mb-5
          "
        />

        <h3
          class="
            text-2xl
            font-bold
            text-slate-900
            mb-3
          "
        >
          Manage Banner
        </h3>

        <p class="text-slate-500">
          Kelola banner yang tampil pada halaman customer.
        </p>
      </NuxtLink>

      <!-- Paket -->
      <NuxtLink
        to="/admin/travel-packages"
        class="
          bg-white
          rounded-[28px]
          p-8
          shadow-sm
          border
          border-slate-100
          hover:-translate-y-2
          hover:shadow-xl
          transition-all
        "
      >
        <Plane
          class="
            w-10
            h-10
            text-green-600
            mb-5
          "
        />

        <h3
          class="
            text-2xl
            font-bold
            text-slate-900
            mb-3
          "
        >
          Manage Paket
        </h3>

        <p class="text-slate-500">
          Tambahkan, ubah, dan hapus paket wisata.
        </p>
      </NuxtLink>

      <!-- Review -->
      <NuxtLink
        to="/admin/reviews"
        class="
          bg-white
          rounded-[28px]
          p-8
          shadow-sm
          border
          border-slate-100
          hover:-translate-y-2
          hover:shadow-xl
          transition-all
        "
      >
        <MessageSquare
          class="
            w-10
            h-10
            text-yellow-500
            mb-5
          "
        />

        <h3
          class="
            text-2xl
            font-bold
            text-slate-900
            mb-3
          "
        >
          Manage Review
        </h3>

        <p class="text-slate-500">
          Kelola testimonial dan review customer.
        </p>
      </NuxtLink>
    </div>
  </div>
</template>