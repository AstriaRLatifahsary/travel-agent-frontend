<script setup lang="ts">
const { data: reviews } = await useFetch(
  'http://localhost:3333/admin/reviews'
)
</script>

<template>
  <div
    class="
      bg-slate-50
      min-h-screen
      py-16
    "
  >
    <div
      class="
        container
        mx-auto
        px-6
      "
    >
      <!-- Header -->
      <div
        class="
          text-center
          mb-14
        "
      >
        <span
          class="
            text-blue-600
            font-semibold
            tracking-[6px]
            uppercase
          "
        >
          Testimonial
        </span>

        <h1
          class="
            text-4xl
            md:text-5xl
            font-bold
            mt-4
            text-slate-900
          "
        >
          Apa Kata Customer Kami?
        </h1>

        <p
          class="
            text-slate-500
            mt-5
            max-w-2xl
            mx-auto
            leading-8
          "
        >
          Pengalaman terbaik dari para pelanggan
          yang telah berlibur bersama Travel Agent.
        </p>
      </div>

      <!-- Card Review -->
      <div
        class="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        <div
          v-for="review in reviews"
          :key="review.id"
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
            duration-300
          "
        >
          <!-- Rating -->
          <div
            class="
              flex
              gap-1
              mb-6
            "
          >
            <span
              v-for="i in review.rating"
              :key="i"
              class="
                text-yellow-400
                text-xl
              "
            >
              ★
            </span>
          </div>

          <!-- Comment -->
          <p
            class="
              text-slate-600
              leading-8
              mb-8
            "
          >
            "{{ review.comment }}"
          </p>

          <!-- Customer -->
          <div
            class="
              flex
              items-center
              gap-4
            "
          >
            <img
              :src="
                review.customerPhoto &&
                review.customerPhoto.startsWith('http')
                  ? review.customerPhoto
                  : 'https://i.pravatar.cc/150?img=' + review.id
              "
              class="
                w-14
                h-14
                rounded-full
                object-cover
              "
            />

            <div>
              <h3
                class="
                  font-semibold
                  text-slate-900
                "
              >
                {{
                  review.customerName ||
                  review.customer_name
                }}
              </h3>

              <p
                class="
                  text-sm
                  text-slate-500
                "
              >
                Pelanggan Travel Agent
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>