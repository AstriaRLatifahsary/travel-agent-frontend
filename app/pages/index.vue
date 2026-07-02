<script setup lang="ts">
import {
  Wallet,
  Compass,
  MapPinned,
  Users,
} from 'lucide-vue-next'

const { data: packages } = await useFetch(
  'http://localhost:3333/admin/travel-packages'
)

const { data: reviews } = await useFetch(
  'http://localhost:3333/admin/reviews'
)

const orderNow = () => {
  window.open(
    'https://wa.me/6281234567890',
    '_blank'
  )
}
</script>

<template>
  <div class="bg-gradient-to-b from-slate-50 via-white to-slate-50">

    <!-- HERO -->
    <section>
      <BannerCarousel />
    </section>

    <!-- ABOUT -->
    <section class="py-20">
      <div
        class="
          container
          mx-auto
          px-6
          grid
          md:grid-cols-2
          gap-12
          items-center
        "
      >
        <div>
          <span
            class="
              text-blue-600
              font-semibold
              tracking-[6px]
            "
          >
            ABOUT US
          </span>

          <h2
            class="
              text-3xl
              md:text-4xl
              font-bold
              mt-5
              leading-tight
              text-slate-900
            "
          >
            Jelajahi Keindahan Indonesia Bersama Kami
          </h2>
        </div>

        <div>
          <p
            class="
              text-slate-500
              text-base
              md:text-lg
              leading-8
            "
          >
            Kami menghadirkan pengalaman wisata terbaik
            ke berbagai destinasi favorit di Indonesia.
            Nikmati perjalanan yang nyaman, aman, dan
            menyenangkan bersama Travel Agent.
          </p>
        </div>
      </div>
    </section>

    <!-- Statistik -->
    <section class="pb-20">
      <div class="container mx-auto px-6">
        <div
          class="
            max-w-5xl
            mx-auto
            bg-gradient-to-r
            from-blue-600
            to-sky-500
            rounded-[32px]
            px-3
            py-3
            shadow-xl
          "
        >
          <div
            class="
              grid
              grid-cols-2
              md:grid-cols-4
              divide-y
              md:divide-y-0
              md:divide-x
              divide-white/20
            "
          >
            <!-- Customer -->
            <div class="text-center py-4">
              <h3
                class="
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-white
                "
              >
                1000+
              </h3>

              <p
                class="
                  text-sm
                  md:text-base
                  text-blue-100
                  mt-2
                "
              >
                Customer Bahagia
              </p>
            </div>

            <!-- Destinasi -->
            <div class="text-center py-4">
              <h3
                class="
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-white
                "
              >
                50+
              </h3>

              <p
                class="
                  text-sm
                  md:text-base
                  text-blue-100
                  mt-2
                "
              >
                Destinasi
              </p>
            </div>

            <!-- Pengalaman -->
            <div class="text-center py-4">
              <h3
                class="
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-white
                "
              >
                5+
              </h3>

              <p
                class="
                  text-sm
                  md:text-base
                  text-blue-100
                  mt-2
                "
              >
                Tahun Pengalaman
              </p>
            </div>

            <!-- Support -->
            <div class="text-center py-4">
              <h3
                class="
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-white
                "
              >
                24/7
              </h3>

              <p
                class="
                  text-sm
                  md:text-base
                  text-blue-100
                  mt-2
                "
              >
                Customer Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DESTINASI POPULER -->
    <section class="pb-12">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <span
            class="
              text-blue-600
              font-semibold
              tracking-[6px]
              uppercase
            "
          >
            Destinations
          </span>

          <h2
            class="
              text-4xl
              font-bold
              mt-4
            "
          >
            Destinasi Populer
          </h2>

          <p
            class="
              text-slate-500
              mt-4
              max-w-2xl
              mx-auto
            "
          >
            Temukan berbagai destinasi favorit yang
            paling banyak dipilih oleh customer kami.
          </p>
        </div>

        <div
          class="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-6
            gap-5
          "
        >
          <NuxtLink
            v-for="destination in [
              'Bali',
              'Lombok',
              'Raja Ampat',
              'Labuan Bajo',
              'Yogyakarta',
              'Bromo'
            ]"
            :key="destination"
            to="/packages"
            class="
              bg-white
              border
              border-slate-200
              rounded-2xl
              py-6
              px-4
              text-center
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              hover:border-blue-500
              transition-all
            "
          >
            <MapPinned
              class="
                w-7
                h-7
                text-blue-600
                mx-auto
                mb-3
              "
            />

            <p
              class="
                font-medium
                text-sm
                text-slate-700
              "
            >
              {{ destination }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- PAKET -->
    <section class="pt-12 pb-24 bg-slate-50">
      <div class="container mx-auto px-6">

        <div class="text-center mb-16">
          <span
            class="
              text-blue-600
              font-semibold
              tracking-[6px]
              uppercase
            "
          >
            Popular Package
          </span>

          <h2
            class="
              text-4xl
              md:text-5xl
              font-bold
              mt-4
            "
          >
            Paket Favorit Customer
          </h2>

          <p
            class="
              text-slate-500
              mt-5
              max-w-2xl
              mx-auto
            "
          >
            Pilihan paket wisata terbaik
            dengan destinasi favorit dan
            pelayanan terbaik.
          </p>
        </div>

        <div
          class="
            grid
            md:grid-cols-3
            gap-10
          "
        >
          <NuxtLink
            v-for="pkg in packages?.slice(0,3)"
            :key="pkg.id"
            :to="`/packages/${pkg.id}`"
            class="block"
          >
            <PackageCard
              :pkg="pkg"
            />
          </NuxtLink>
        </div>

        <div
          class="
            text-center
            mt-16
          "
        >
          <NuxtLink
            to="/packages"
            class="
              inline-flex
              items-center
              gap-3
              bg-blue-600
              text-white
              px-8
              py-4
              rounded-2xl
              shadow-lg
              hover:bg-blue-700
              transition
            "
          >
            Lihat Semua Paket
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- WHY US -->
    <section class="py-20">
      <div class="container mx-auto px-6">

        <div class="text-center mb-14">
          <span
            class="
              text-blue-600
              font-semibold
              tracking-[6px]
              uppercase
            "
          >
            Why Choose Us
          </span>

          <h2
            class="
              text-4xl
              md:text-5xl
              font-bold
              mt-4
            "
          >
            Kenapa Memilih Kami?
          </h2>

          <p
            class="
              text-slate-500
              mt-4
              max-w-2xl
              mx-auto
            "
          >
            Kami memberikan pengalaman perjalanan terbaik
            dengan pelayanan profesional dan destinasi
            pilihan di Indonesia.
          </p>
        </div>

        <div
          class="
            grid
            md:grid-cols-3
            gap-6
          "
        >
          <!-- Harga -->
          <div
            class="
              bg-white
              rounded-[24px]
              p-7
              border
              border-slate-100
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
              text-center
            "
          >
            <div
              class="
                w-12
                h-12
                rounded-xl
                bg-blue-100
                flex
                items-center
                justify-center
                mb-5
                mx-auto
              "
            >
              <Wallet
                class="
                  w-6
                  h-6
                  text-blue-600
                "
              />
            </div>

            <h3
              class="
                text-xl
                font-bold
                mb-3
              "
            >
              Harga Terjangkau
            </h3>

            <p
              class="
                text-slate-500
                text-sm
                leading-7
                max-w-xs
                mx-auto
              "
            >
              Paket wisata dengan harga terbaik,
              transparan, dan sesuai kebutuhan
              perjalanan Anda.
            </p>
          </div>

          <!-- Guide -->
          <div
            class="
              bg-white
              rounded-[24px]
              p-7
              border
              border-slate-100
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
              text-center
            "
          >
            <div
              class="
                w-12
                h-12
                rounded-xl
                bg-blue-100
                flex
                items-center
                justify-center
                mb-5
                mx-auto
              "
            >
              <Compass
                class="
                  w-6
                  h-6
                  text-blue-600
                "
              />
            </div>

            <h3
              class="
                text-xl
                font-bold
                mb-3
              "
            >
              Guide Profesional
            </h3>

            <p
              class="
                text-slate-500
                text-sm
                leading-7
                max-w-xs
                mx-auto
              "
            >
              Dipandu oleh tour guide berpengalaman
              untuk memastikan perjalanan yang aman
              dan menyenangkan.
            </p>
          </div>

          <!-- Destinasi -->
          <div
            class="
              bg-white
              rounded-[24px]
              p-7
              border
              border-slate-100
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
              text-center
            "
          >
            <div
              class="
                w-12
                h-12
                rounded-xl
                bg-blue-100
                flex
                items-center
                justify-center
                mb-5
                mx-auto
              "
            >
              <MapPinned
                class="
                  w-6
                  h-6
                  text-blue-600
                "
              />
            </div>

            <h3
              class="
                text-xl
                font-bold
                mb-3
              "
            >
              Destinasi Terbaik
            </h3>

            <p
              class="
                text-slate-500
                text-sm
                leading-7
                max-w-xs
                mx-auto
              "
            >
              Menyediakan berbagai destinasi favorit
              Indonesia dengan pengalaman wisata yang
              berkesan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- REVIEW -->
    <section class="py-20 bg-slate-50">
      <div class="container mx-auto px-6">

        <div class="text-center mb-12">
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

          <h2
            class="
              text-4xl
              font-bold
              mt-4
              text-slate-900
            "
          >
            Apa Kata Mereka?
          </h2>

          <p
            class="
              text-slate-500
              mt-4
              max-w-2xl
              mx-auto
              leading-7
            "
          >
            Kepuasan pelanggan adalah prioritas kami.
            Berikut pengalaman mereka setelah berlibur bersama
            Travel Agent.
          </p>
        </div>

        <div
          class="
            grid
            md:grid-cols-3
            gap-6
          "
        >
          <div
            v-for="review in reviews?.slice(0, 3)"
            :key="review.id"
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
                  review.customerPhoto &&
                  review.customerPhoto.startsWith('http')
                    ? review.customerPhoto
                    : 'https://i.pravatar.cc/150'
                "
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
        </div>

        <!-- Button -->
        <div class="text-center mt-12">
          <NuxtLink
            to="/reviews"
            class="
              inline-flex
              items-center
              gap-2
              bg-blue-600
              text-white
              px-7
              py-3
              rounded-2xl
              shadow-lg
              hover:bg-blue-700
              transition
            "
          >
            Lihat Semua Review
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- CTA -->
    <section
      class="
        container
        mx-auto
        px-6
        py-12
      "
    >
      <div
        class="
          max-w-2xl
          mx-auto
          bg-gradient-to-r
          from-blue-600
          to-sky-500
          rounded-[32px]
          shadow-xl
          py-14
          px-8
          text-center
          text-white
        "
      >
        <h2
          class="
            text-3xl
            md:text-4xl
            font-bold
            mb-4
          "
        >
          Siap Untuk Liburan Berikutnya?
        </h2>

        <p
          class="
            text-base
            md:text-lg
            text-blue-100
            max-w-2xl
            mx-auto
            mb-8
            leading-7
          "
        >
          Temukan destinasi impianmu dan mulai
          perjalanan yang tak terlupakan bersama
          Travel Agent.
        </p>

        <button
          @click="orderNow"
          class="
            bg-white
            text-blue-600
            font-semibold
            px-8
            py-3
            rounded-2xl
            shadow-lg
            hover:bg-slate-100
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          Pesan Sekarang
        </button>
      </div>
    </section>

  </div>
</template>