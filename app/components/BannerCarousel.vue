<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Pagination,
  Autoplay,
  Navigation,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { data: banners } = await useFetch(
  'http://localhost:3333/admin/banners'
)
</script>

<template>
  <Swiper
    :modules="[
      Pagination,
      Autoplay,
      Navigation
    ]"
    :slides-per-view="1"
    :loop="true"
    :pagination="{ clickable: true }"
    :navigation="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false
    }"
    class="rounded-3xl"
  >
    <SwiperSlide
      v-for="banner in banners"
      :key="banner.id"
    >
      <NuxtLink
        :to="
          banner.travelPackageId
            ? `/packages/${banner.travelPackageId}`
            : '/packages'
        "
        class="block"
      >
        <div
          class="
            h-[500px]
            rounded-3xl
            overflow-hidden
            relative
            cursor-pointer
            transition
            hover:scale-[1.01]
          "
        >
          <img
            :src="
              banner.image ||
              'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429'
            "
            class="w-full h-full object-cover"
          />

          <div
            class="absolute inset-0 bg-black/40 flex items-center"
          >
            <div class="px-20 text-white">
              <h1
                class="text-6xl font-bold mb-5"
              >
                {{ banner.title }}
              </h1>

              <h2 class="text-3xl mb-5">
                {{ banner.subtitle }}
              </h2>

              <p class="max-w-2xl text-lg">
                {{ banner.description }}
              </p>

              <p
                v-if="banner.travelPackageId"
                class="mt-8 text-lg font-semibold underline"
              >
                Lihat Paket →
              </p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>