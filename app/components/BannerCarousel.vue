<script setup lang="ts">
import { Swiper, SwiperSlide }
from 'swiper/vue'

import {
  Pagination,
  Autoplay,
  Navigation,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const router = useRouter()

import type {
  Banner,
} from '~/types/banner'

defineProps<{
  banners: Banner[]
}>()

function goToBanner(
  banner: Banner
) {
  if (banner.travelPackageId) {
    router.push(
      `/packages/${banner.travelPackageId}`
    )
  } else {
    router.push('/packages')
  }
}
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
      delay: 5000,
      disableOnInteraction: false
    }"
    class="hero-swiper"
  >
    <SwiperSlide
      v-for="banner in banners"
      :key="banner.id"
    >
      <section
        @click="goToBanner(banner)"
        class="
          relative
          h-[40vh]
          md:h-[45vh]
          overflow-hidden
          cursor-pointer
        "
      >
        <!-- IMAGE -->
        <img
          :src="
            banner.image ||
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429'
          "
          class="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            scale-105
          "
        />

        <!-- OVERLAY -->
        <div
          class="
            absolute
            inset-0
            bg-gradient-to-r
            from-slate-950/80
            via-slate-950/55
            to-transparent
          "
        />

        <!-- CONTENT -->
        <div
          class="
            relative
            container
            mx-auto
            h-full
            px-6
            flex
            items-center
          "
        >
          <div
            class="
              max-w-2xl
              text-white
            "
          >
            <p
              class="
                uppercase
                tracking-[5px]
                text-blue-300
                font-medium
                mb-3
                text-xs
                md:text-sm
              "
            >
              Explore Indonesia
            </p>

            <h1
              class="
                text-3xl
                md:text-5xl
                font-bold
                leading-tight
                mb-4
              "
            >
              {{ banner.title }}
            </h1>

            <p
              class="
                text-sm
                md:text-lg
                text-slate-200
                max-w-xl
                mb-6
                line-clamp-2
              "
            >
              {{
                banner.description ||
                banner.subtitle
              }}
            </p>

            <div
              class="
                flex
                gap-4
                flex-wrap
              "
            >
              <NuxtLink
                v-if="
                  banner.travelPackageId
                "
                :to="`/packages/${banner.travelPackageId}`"
                @click.stop
                class="
                  bg-blue-600
                  hover:bg-blue-700
                  px-6
                  py-3
                  rounded-xl
                  font-medium
                  transition
                  shadow-lg
                  text-sm
                "
              >
                Lihat Paket
              </NuxtLink>

              <NuxtLink
                to="/packages"
                @click.stop
                class="
                  bg-white/15
                  backdrop-blur-md
                  border
                  border-white/20
                  px-6
                  py-3
                  rounded-xl
                  font-medium
                  hover:bg-white/20
                  transition
                  text-sm
                "
              >
                Semua Paket
              </NuxtLink>
            </div>

            <!-- Mini Info -->
            <div
              class="
                hidden
                md:flex
                gap-10
                mt-8
                text-slate-300
              "
            >
              <div>
                <p
                  class="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  1000+
                </p>

                <p class="text-sm">
                  Travelers
                </p>
              </div>

              <div>
                <p
                  class="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  50+
                </p>

                <p class="text-sm">
                  Destinations
                </p>
              </div>

              <div>
                <p
                  class="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  5+
                </p>

                <p class="text-sm">
                  Years Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SwiperSlide>
  </Swiper>
</template>

<style>
.hero-swiper .swiper-button-next,
.hero-swiper .swiper-button-prev {
  color: white;
}

.hero-swiper .swiper-pagination-bullet {
  background: white;
  opacity: 0.6;
}

.hero-swiper .swiper-pagination-bullet-active {
  background: #2563eb;
  opacity: 1;
}
</style>