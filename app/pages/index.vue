<script setup lang="ts">
const { data: packages } = await useFetch(
  'http://localhost:3333/admin/travel-packages'
)

const { data: reviews } = await useFetch(
  'http://localhost:3333/admin/reviews'
)
</script>

<template>
  <div>
    <!-- Banner Carousel -->
    <section class="container mx-auto py-10 px-6">
      <BannerCarousel />
    </section>

    <!-- Tentang Kami -->
    <section class="container mx-auto py-20 px-6">
      <h2 class="text-4xl font-bold text-center mb-8">
        Tentang Kami
      </h2>

      <p
        class="text-center text-gray-600 max-w-4xl mx-auto text-lg"
      >
        Travel Agent adalah penyedia layanan perjalanan wisata
        yang menawarkan berbagai paket liburan menarik ke
        destinasi terbaik di Indonesia dengan pelayanan
        profesional dan harga yang terjangkau.
      </p>
    </section>

    <!-- Paket Populer -->
    <section class="container mx-auto py-20 px-6">
      <h2 class="text-4xl font-bold text-center mb-12">
        Paket Populer
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <NuxtLink
          v-for="pkg in packages?.slice(0, 3)"
          :key="pkg.id"
          :to="`/packages/${pkg.id}`"
          class="block"
        >
          <PackageCard :pkg="pkg" />
        </NuxtLink>
      </div>

      <div class="text-center mt-12">
        <NuxtLink
          to="/packages"
          class="
            inline-block
            bg-blue-600
            text-white
            px-8
            py-3
            rounded-xl
            hover:bg-blue-700
            transition
          "
        >
          Lihat Semua Paket
        </NuxtLink>
      </div>
    </section>

    <!-- Kenapa Memilih Kami -->
    <section class="bg-blue-50 py-20">
      <div class="container mx-auto px-6">
        <h2
          class="text-4xl font-bold text-center mb-12"
        >
          Kenapa Memilih Kami?
        </h2>

        <div
          class="grid md:grid-cols-3 gap-8 text-center"
        >
          <div
            class="bg-white p-8 rounded-2xl shadow"
          >
            <h3
              class="font-bold text-2xl mb-4"
            >
              Harga Terjangkau
            </h3>

            <p class="text-gray-600">
              Paket wisata dengan harga terbaik.
            </p>
          </div>

          <div
            class="bg-white p-8 rounded-2xl shadow"
          >
            <h3
              class="font-bold text-2xl mb-4"
            >
              Tour Guide Profesional
            </h3>

            <p class="text-gray-600">
              Dipandu oleh guide berpengalaman.
            </p>
          </div>

          <div
            class="bg-white p-8 rounded-2xl shadow"
          >
            <h3
              class="font-bold text-2xl mb-4"
            >
              Destinasi Terbaik
            </h3>

            <p class="text-gray-600">
              Menyediakan berbagai destinasi favorit.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Review Customer -->
    <section
      class="container mx-auto py-20 px-6"
    >
      <h2
        class="text-4xl font-bold text-center mb-12"
      >
        Review Customer
      </h2>

      <div
        class="grid md:grid-cols-3 gap-8"
      >
        <div
          v-for="review in reviews?.slice(0, 3)"
          :key="review.id"
          class="
            bg-white
            rounded-2xl
            shadow
            p-8
          "
        >
          <h3
            class="font-bold text-xl mb-4"
          >
            {{ review.customerName }}
          </h3>

          <p
            class="text-gray-600 mb-6"
          >
            {{ review.comment }}
          </p>

          <p
            class="text-yellow-500 font-bold"
          >
            ⭐ {{ review.rating }}/5
          </p>
        </div>
      </div>
    </section>
  </div>
</template>