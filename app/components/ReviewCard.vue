<script setup lang="ts">
import type {
  Review,
} from '~/types/review'

defineProps<{
  review: Review
}>()
</script>

<template>
  <div
    class="
      bg-white
      rounded-[24px]
      p-7
      border
      border-slate-100
      shadow-sm
      hover:-translate-y-1
      hover:shadow-xl
      transition-all
      duration-300
    "
  >
    <!-- Quote -->
    <div
      class="
        text-5xl
        text-blue-100
        font-serif
        leading-none
        mb-4
      "
    >
      "
    </div>

    <!-- Komentar -->
    <p
      class="
        text-slate-500
        text-sm
        leading-7
        mb-7
      "
    >
      {{ review.comment }}
    </p>

    <!-- User -->
    <div
      class="
        flex
        items-center
        gap-3
      "
    >
      <img
        :src="
          review.customerPhoto ||
          `https://ui-avatars.com/api/?name=${review.customerName}&background=2563eb&color=ffffff`
        "
        loading="lazy"
        class="
          w-12
          h-12
          rounded-full
          object-cover
        "
      />

      <div>
        <h3
          class="
            font-semibold
            text-slate-900
            text-sm
          "
        >
          {{ review.customerName }}
        </h3>

        <div
          class="
            flex
            items-center
            gap-1
            text-yellow-500
            text-sm
            mt-1
          "
        >
          <span
            v-for="i in review.rating"
            :key="i"
          >
            ★
          </span>
        </div>
      </div>
    </div>
  </div>
</template>