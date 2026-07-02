<script setup lang="ts">
import {
  ArrowLeft,
  MapPin,
  Clock3,
  Users,
  Hotel,
  Star,
} from 'lucide-vue-next'

const route = useRoute()

const { data: pkg } =
  await useFetch(
    `http://localhost:3333/admin/travel-packages/${route.params.id}`
  )

const { data: reviews } =
  await useFetch(
    'http://localhost:3333/admin/reviews'
  )

const packageReviews = computed(() => {
  if (!reviews.value || !pkg.value)
    return []

  return reviews.value.filter(
    (r: any) =>
      r.travelPackageId === pkg.value.id
  )
})

const orderPackage = () => {
  window.open(
    `https://wa.me/6281234567890?text=Saya tertarik dengan ${pkg.value.title}`,
    '_blank'
  )
}
</script>

<template>
  <div
    v-if="pkg"
    class="
      container
      mx-auto
      px-6
      py-10
      max-w-7xl
    "
  >
    <!-- BACK -->
    <NuxtLink
      to="/packages"
      class="
        inline-flex
        items-center
        gap-2
        mb-6
        text-slate-500
        hover:text-blue-600
        transition
      "
    >
      <ArrowLeft class="w-4 h-4" />
      <span>Kembali ke Paket</span>
    </NuxtLink>

    <section
      class="
        grid
        lg:grid-cols-2
        gap-8
        items-start
      "
    >
      <!-- LEFT -->
      <div>
        <img
          :src="pkg.image"
          class="
            w-full
            h-[220px]
            md:h-[260px]
            object-cover
            rounded-[28px]
            shadow-lg
            mb-6
          "
        />

        <h1
          class="
            text-3xl
            font-bold
            text-slate-900
            mb-2
          "
        >
          {{ pkg.title }}
        </h1>

        <div
          class="
            flex
            items-center
            gap-2
            text-slate-500
            mb-6
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

        <!-- PRICE -->
        <div
          class="
            flex
            items-center
            justify-between
            mb-6
          "
        >
          <div>
            <p
              class="
                text-xs
                text-slate-400
              "
            >
              Mulai dari
            </p>

            <h2
              class="
                text-3xl
                font-bold
                text-blue-600
              "
            >
              Rp
              {{
                Number(pkg.price)
                  .toLocaleString('id-ID')
              }}
            </h2>
          </div>

          <button
            @click="orderPackage"
            class="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-2xl
              font-medium
              hover:bg-blue-700
              transition
            "
          >
            Pesan Sekarang
          </button>
        </div>

        <!-- DETAIL -->
        <div
          class="
            bg-slate-50
            rounded-[24px]
            p-5
          "
        >
          <h3
            class="
              text-lg
              font-semibold
              mb-5
            "
          >
            Detail Perjalanan
          </h3>

          <div
            class="
              space-y-4
            "
          >
            <div
              class="
                flex
                justify-between
                items-center
              "
            >
              <div
                class="
                  flex
                  items-center
                  gap-2
                  text-slate-500
                "
              >
                <Clock3
                  class="
                    w-4
                    h-4
                  "
                />

                Durasi
              </div>

              <span
                class="
                  font-semibold
                "
              >
                {{ pkg.duration }}
              </span>
            </div>

            <div
              class="
                flex
                justify-between
                items-center
              "
            >
              <div
                class="
                  flex
                  items-center
                  gap-2
                  text-slate-500
                "
              >
                <Users
                  class="
                    w-4
                    h-4
                  "
                />

                Kuota
              </div>

              <span
                class="
                  font-semibold
                "
              >
                {{ pkg.quota }} Orang
              </span>
            </div>

            <div
              class="
                flex
                justify-between
                items-start
              "
            >
              <div
                class="
                  flex
                  items-center
                  gap-2
                  text-slate-500
                "
              >
                <Hotel
                  class="
                    w-4
                    h-4
                  "
                />

                Fasilitas
              </div>

              <span
                class="
                  font-semibold
                  text-right
                  max-w-[220px]
                "
              >
                {{ pkg.facilities }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div>
        <!-- DESCRIPTION -->
        <div
          class="
            bg-slate-50
            rounded-[24px]
            p-6
            mb-6
          "
        >
          <h2
            class="
              text-xl
              font-semibold
              mb-4
            "
          >
            Tentang Perjalanan
          </h2>

          <p
            class="
              text-slate-600
              leading-7
            "
          >
            {{ pkg.description }}

            Nikmati pengalaman wisata yang nyaman,
            itinerary terbaik, dan pelayanan
            profesional untuk menciptakan perjalanan
            yang tak terlupakan bersama keluarga
            maupun teman-teman Anda.
          </p>
        </div>

        <!-- REVIEW -->
        <div>
          <h2
            class="
              text-xl
              font-semibold
              mb-5
            "
          >
            Review Customer
          </h2>

          <div
            class="
              space-y-4
            "
          >
            <div
              v-if="
                packageReviews.length === 0
              "
              class="
                bg-slate-50
                rounded-2xl
                p-5
                text-slate-500
              "
            >
              Belum ada review untuk paket ini.
            </div>

            <div
              v-for="
                review in packageReviews
              "
              :key="review.id"
              class="
                bg-white
                border
                border-slate-100
                rounded-2xl
                p-5
                shadow-sm
              "
            >
              <div
                class="
                  flex
                  justify-between
                  items-center
                  mb-3
                "
              >
                <h3
                  class="
                    font-medium
                  "
                >
                  {{ review.customerName }}
                </h3>

                <div
                  class="
                    flex
                    gap-1
                  "
                >
                  <Star
                    v-for="
                      i in review.rating
                    "
                    :key="i"
                    class="
                      w-4
                      h-4
                      text-yellow-400
                      fill-yellow-400
                    "
                  />
                </div>
              </div>

              <p
                class="
                  text-sm
                  text-slate-500
                  leading-7
                "
              >
                {{ review.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>