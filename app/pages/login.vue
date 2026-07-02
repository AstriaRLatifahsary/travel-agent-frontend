<script setup lang="ts">
definePageMeta({
  layout: false,
})

import Swal from 'sweetalert2'
import { Globe2 } from 'lucide-vue-next'

const form = reactive({
  email: '',
  password: '',
})

const loading = ref(false)

const login = async () => {
  loading.value = true

  try {
    const response = await $fetch(
      'http://localhost:3333/admin/login',
      {
        method: 'POST',
        body: form,
      }
    )

    localStorage.setItem(
      'admin',
      JSON.stringify(response)
    )

    await Swal.fire({
      icon: 'success',
      title: 'Login Berhasil',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })

    navigateTo('/admin')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Gagal',
      text: 'Email atau password salah.',
      confirmButtonColor: '#2563eb',
    })

    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="
      min-h-screen
      relative
      overflow-hidden
      bg-gradient-to-br
      from-slate-50
      via-blue-50
      to-slate-100
      flex
      items-center
      justify-center
      p-6
    "
  >
    <!-- Decorative Blur -->
    <div
      class="
        absolute
        -top-32
        -left-32
        w-96
        h-96
        bg-blue-200/50
        rounded-full
        blur-3xl
      "
    />

    <div
      class="
        absolute
        -bottom-32
        -right-32
        w-96
        h-96
        bg-sky-200/50
        rounded-full
        blur-3xl
      "
    />

    <!-- Card -->
    <div
      class="
        relative
        z-10
        bg-white/90
        backdrop-blur-xl
        border
        border-white
        rounded-[36px]
        shadow-[0_20px_60px_rgba(15,23,42,0.12)]
        p-10
        w-full
        max-w-md
      "
    >
      <!-- Logo -->
      <div class="text-center mb-10">
        <div
          class="
            w-16
            h-16
            rounded-3xl
            bg-gradient-to-br
            from-blue-600
            to-sky-500
            flex
            items-center
            justify-center
            mx-auto
            shadow-lg
            mb-5
          "
        >
          <Globe2
            class="
              w-8
              h-8
              text-white
            "
          />
        </div>

        <h1
          class="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Travel Agent CMS
        </h1>

        <p
          class="
            text-slate-500
            mt-3
          "
        >
          Login sebagai Administrator
        </p>
      </div>

      <!-- Form -->
      <form
        @submit.prevent="login"
        class="space-y-5"
      >
        <div>
          <label
            class="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
            "
          >
            Email
          </label>

          <input
            v-model="form.email"
            type="email"
            placeholder="admin@gmail.com"
            class="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
            "
          />
        </div>

        <div>
          <label
            class="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
            "
          >
            Password
          </label>

          <input
            v-model="form.password"
            type="password"
            placeholder="********"
            class="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
            "
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="
            w-full
            bg-blue-600
            text-white
            py-3.5
            rounded-2xl
            font-semibold
            shadow-lg
            hover:bg-blue-700
            hover:shadow-xl
            transition
            disabled:opacity-50
          "
        >
          {{
            loading
              ? 'Loading...'
              : 'Login'
          }}
        </button>
      </form>
    </div>
  </div>
</template>