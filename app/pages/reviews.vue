<script setup lang="ts">
const { data: reviews } = await useFetch(
  'http://localhost:3333/admin/reviews'
)
</script>

<template>
  <div class="container mx-auto py-10 px-6">
    <h1 class="text-4xl font-bold mb-10">
      Review Customer
    </h1>

    <div class="space-y-6">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-xl shadow p-6"
      >
        <h2 class="text-xl font-bold">
          {{ review.customer_name }}
        </h2>

        <p class="mt-3 text-gray-600">
          {{ review.comment }}
        </p>

        <p class="mt-4 text-yellow-500 font-bold">
          ⭐ {{ review.rating }}/5
        </p>
      </div>
    </div>
  </div>
</template>