<script setup lang="ts">
import { Globe2 } from 'lucide-vue-next'

const route = useRoute()

const contactUs = () => {
  window.open(
    'https://wa.me/6281234567890',
    '_blank'
  )
}
</script>

<template>
  <nav
    class="
      sticky
      top-0
      z-50
      bg-white/90
      backdrop-blur-lg
      border-b
      border-slate-100
    "
  >
    <div
      class="
        container
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
      "
    >
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="
            flex
            items-center
            gap-3
            group
          "
        >
          <div
            class="
              w-11
              h-11
              rounded-2xl
              bg-gradient-to-br
              from-blue-600
              to-sky-500
              flex
              items-center
              justify-center
              shadow-lg
              group-hover:scale-110
              transition
            "
          >
            <Globe2
              class="
                w-5
                h-5
                text-white
              "
            />
          </div>

          <div>
            <h1
              class="
                text-xl
                font-bold
                text-slate-900
              "
            >
              Travel Agent
            </h1>

            <p
              class="
                text-xs
                text-slate-500
                tracking-wide
              "
            >
              Explore Indonesia
            </p>
          </div>
        </NuxtLink>

        <!-- Menu -->
        <div
          class="
            hidden
            md:flex
            items-center
            gap-10
          "
        >
          <NuxtLink
            to="/"
            class="
              relative
              text-slate-600
              hover:text-blue-600
              transition
            "
            :class="
              route.path === '/'
                ? 'text-blue-600 font-semibold'
                : ''
            "
          >
            Home

            <span
              v-if="route.path === '/'"
              class="
                absolute
                -bottom-2
                left-0
                w-full
                h-0.5
                bg-blue-600
                rounded-full
              "
            />
          </NuxtLink>

          <NuxtLink
            to="/packages"
            class="
              relative
              text-slate-600
              hover:text-blue-600
              transition
            "
            :class="
              route.path.startsWith('/packages')
                ? 'text-blue-600 font-semibold'
                : ''
            "
          >
            Paket

            <span
              v-if="
                route.path.startsWith('/packages')
              "
              class="
                absolute
                -bottom-2
                left-0
                w-full
                h-0.5
                bg-blue-600
                rounded-full
              "
            />
          </NuxtLink>

          <NuxtLink
            to="/reviews"
            class="
              relative
              text-slate-600
              hover:text-blue-600
              transition
            "
            :class="
              route.path === '/reviews'
                ? 'text-blue-600 font-semibold'
                : ''
            "
          >
            Review

            <span
              v-if="route.path === '/reviews'"
              class="
                absolute
                -bottom-2
                left-0
                w-full
                h-0.5
                bg-blue-600
                rounded-full
              "
            />
          </NuxtLink>
        </div>

        <!-- CTA -->
        <button
          @click="contactUs"
          class="
            hidden
            md:block
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-2xl
            shadow-lg
            hover:bg-blue-700
            hover:-translate-y-0.5
            transition-all
          "
        >
          Hubungi Kami
        </button>
    </div>
  </nav>
</template>