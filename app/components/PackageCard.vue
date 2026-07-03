<script setup lang="ts">
import {
  MapPin,
  Star,
  ArrowRight,
} from 'lucide-vue-next'

import type {
  TravelPackage,
} from '~/types/travel-package'

defineProps<{
  pkg: TravelPackage
}>()
</script>

<template>
  <div
    class="
      bg-white
      rounded-[28px]
      overflow-hidden
      border
      border-slate-100
      shadow-sm
      hover:-translate-y-2
      hover:shadow-2xl
      transition-all
      duration-300
    "
  >
    <!-- IMAGE -->
    <div class="relative">
      <img
        :src="pkg.image"
        loading="lazy"
        class="
          w-full
          h-64
          object-cover
        "
      />

      <!-- PRICE -->
      <div
        class="
          absolute
          top-5
          right-5
          bg-white/90
          backdrop-blur-md
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          shadow-lg
        "
      >
        Rp
        {{ Number(pkg.price).toLocaleString('id-ID') }}
      </div>
    </div>

    <!-- CONTENT -->
    <div class="p-6">
      <div
        class="
          flex
          items-center
          gap-2
          text-slate-500
          text-sm
          mb-3
        "
      >
        <MapPin
          class="
            w-4
            h-4
            text-blue-600
          "
        />

        {{ pkg.destination }}
      </div>

      <h3
        class="
          text-2xl
          font-bold
          text-slate-900
          mb-5
        "
      >
        {{ pkg.title }}
      </h3>

      <div
        class="
          flex
          items-center
          justify-between
        "
      >
        <!-- Rating -->
        <div
          class="
            flex
            items-center
            gap-2
          "
        >
          <Star
            class="
              w-5
              h-5
              text-yellow-400
              fill-yellow-400
            "
          />

          <span class="font-semibold">
             {{ pkg.rating ?? '0.0' }}
          </span>

          <span
            class="
              text-slate-400
              text-sm
            "
          >
            ({{ pkg.reviewCount ?? 0 }}
            {{
              (pkg.reviewCount ?? 0) > 1
                ? 'Reviews'
                : 'Review'
            }})
          </span>
        </div>

        <!-- Detail -->
        <div
          class="
            flex
            items-center
            gap-2
            text-blue-600
            font-semibold
          "
        >
          Detail

          <ArrowRight
            class="
              w-4
              h-4
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>