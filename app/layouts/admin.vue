<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  LayoutDashboard,
  Images,
  Plane,
  MessageSquare,
  Menu,
  Globe2,
  LogOut,
} from 'lucide-vue-next'

const route = useRoute()

const isOpen = ref(true)

const logout = () => {
  localStorage.removeItem('admin')
  navigateTo('/login')
}
</script>

<template>
  <div
    class="
      min-h-screen
      flex
      bg-slate-50
    "
  >
    <!-- Sidebar -->
    <aside
      :class="
        isOpen
          ? 'w-72'
          : 'w-20'
      "
      class="
        bg-white
        border-r
        border-slate-200
        transition-all
        duration-300
        flex
        flex-col
        shadow-sm
      "
    >
      <!-- Header -->
      <div
        class="
          h-20
          border-b
          border-slate-100
          flex
          items-center
          px-4
        "
        :class="
          isOpen
            ? 'justify-between'
            : 'justify-center'
        "
      >
        <div
          class="
            flex
            items-center
            gap-3
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

          <div v-if="isOpen">
            <h1
              class="
                font-bold
                text-slate-900
              "
            >
              CMS Admin
            </h1>

            <p
              class="
                text-xs
                text-slate-500
              "
            >
              Travel Agent
            </p>
          </div>
        </div>
      </div>

      <!-- Menu -->
      <div
        class="
          p-4
          flex-1
          space-y-2
        "
      >
        <!-- Dashboard -->
        <NuxtLink
          to="/admin"
          :class="[
            route.path === '/admin'
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600',
            isOpen
              ? 'justify-start px-4 gap-4'
              : 'justify-center px-0'
          ]"
          class="
            flex
            items-center
            py-3
            rounded-2xl
            hover:bg-slate-100
            transition
          "
        >
          <LayoutDashboard class="w-5 h-5" />

          <span v-if="isOpen">
            Dashboard
          </span>
        </NuxtLink>

        <!-- Banner -->
        <NuxtLink
          to="/admin/banner"
          :class="[
            route.path.includes('/admin/banner')
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600',
            isOpen
              ? 'justify-start px-4 gap-4'
              : 'justify-center px-0'
          ]"
          class="
            flex
            items-center
            py-3
            rounded-2xl
            hover:bg-slate-100
            transition
          "
        >
          <Images class="w-5 h-5" />

          <span v-if="isOpen">
            Banner
          </span>
        </NuxtLink>

        <!-- Paket -->
        <NuxtLink
          to="/admin/travel-packages"
          :class="[
            route.path.includes('/admin/travel-packages')
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600',
            isOpen
              ? 'justify-start px-4 gap-4'
              : 'justify-center px-0'
          ]"
          class="
            flex
            items-center
            py-3
            rounded-2xl
            hover:bg-slate-100
            transition
          "
        >
          <Plane class="w-5 h-5" />

          <span v-if="isOpen">
            Paket Traveling
          </span>
        </NuxtLink>

        <!-- Review -->
        <NuxtLink
          to="/admin/reviews"
          :class="[
            route.path.includes('/admin/reviews')
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600',
            isOpen
              ? 'justify-start px-4 gap-4'
              : 'justify-center px-0'
          ]"
          class="
            flex
            items-center
            py-3
            rounded-2xl
            hover:bg-slate-100
            transition
          "
        >
          <MessageSquare class="w-5 h-5" />

          <span v-if="isOpen">
            Review Customer
          </span>
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div
        class="
          border-t
          border-slate-100
          p-4
          sticky
          bottom-0
          bg-white
        "
      >
        <!-- Expanded -->
        <div
          v-if="isOpen"
          class="space-y-3"
        >
          <div
            class="
              bg-slate-50
              rounded-2xl
              p-4
            "
          >
            <p
              class="
                text-sm
                text-slate-500
              "
            >
              Travel Agent CMS
            </p>

            <p
              class="
                text-xs
                text-slate-400
                mt-1
              "
            >
              Admin Panel v1.0
            </p>
          </div>

          <div class="flex gap-2">
            <button
              @click="logout"
              class="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                py-3
                rounded-2xl
                text-red-500
                hover:bg-red-50
                transition
              "
            >
              <LogOut
                class="
                  w-5
                  h-5
                "
              />

              Logout
            </button>

            <button
              @click="isOpen = false"
              class="
                p-3
                rounded-2xl
                hover:bg-slate-100
                transition
              "
            >
              <Menu
                class="
                  w-5
                  h-5
                  text-slate-600
                "
              />
            </button>
          </div>
        </div>

        <!-- Collapsed -->
        <div
          v-else
          class="
            flex
            flex-col
            items-center
            gap-3
          "
        >
          <button
            @click="logout"
            class="
              p-3
              rounded-xl
              text-red-500
              hover:bg-red-50
              transition
            "
          >
            <LogOut
              class="
                w-5
                h-5
              "
            />
          </button>

          <button
            @click="isOpen = true"
            class="
              p-3
              rounded-xl
              hover:bg-slate-100
              transition
            "
          >
            <Menu
              class="
                w-5
                h-5
                text-slate-600
              "
            />
          </button>
        </div>
      </div>
    </aside>

    <!-- Content -->
    <main
      class="
        flex-1
        overflow-auto
      "
    >
      <slot />
    </main>
  </div>
</template>