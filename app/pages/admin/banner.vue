<script setup lang="ts">
import {
  Images,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-vue-next'

import Swal from 'sweetalert2'

definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

const { data: packages } = await useFetch(
  'http://localhost:3333/admin/travel-packages'
)

const {
  data: banners,
  refresh,
} = await useFetch(
  'http://localhost:3333/admin/banners'
)

const showForm = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  title: '',
  subtitle: '',
  image: '',
  description: '',
  travelPackageId: '',
})

function resetForm() {
  form.title = ''
  form.subtitle = ''
  form.image = ''
  form.description = ''
  form.travelPackageId = ''

  editingId.value = null
}

function openCreate() {
  resetForm()
  showForm.value = true
}

function openEdit(banner: any) {
  editingId.value = banner.id

  form.title = banner.title
  form.subtitle = banner.subtitle
  form.image = banner.image
  form.description = banner.description
  form.travelPackageId =
    banner.travelPackageId ?? ''

  showForm.value = true
}

async function saveBanner() {
  if (!form.travelPackageId) {
  await Swal.fire({
    icon: 'warning',
    title: 'Pilih Paket',
    text: 'Silakan pilih paket tujuan terlebih dahulu.',
    confirmButtonColor: '#2563eb',
  })

  return
} 

  const payload = {
    title: form.title,
    subtitle: form.subtitle,
    image: form.image,
    description: form.description,
    travel_package_id: Number(
      form.travelPackageId
    ),
  }

  try {
    if (editingId.value) {
      console.log(payload)
      await $fetch(
        `http://localhost:3333/admin/banners/${editingId.value}`,
        {
          method: 'PUT',
          body: payload,
        }
      )
    } else {
      await $fetch(
        'http://localhost:3333/admin/banners',
        {
          method: 'POST',
          body: payload,
        }
      )
    }

    showForm.value = false
    resetForm()
    refresh()
  } catch (error) {
    console.error(error)
    alert('Gagal menyimpan data')
  }
}

async function deleteBanner(id: number) {
  const result =
    await Swal.fire({
      title: 'Hapus Banner?',
      text:
        'Data yang dihapus tidak dapat dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ef4444',
    })

  if (!result.isConfirmed)
    return

  try {
    await $fetch(
      `http://localhost:3333/admin/banners/${id}`,
      {
        method: 'DELETE',
      }
    )

    refresh()

    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Banner berhasil dihapus.',
      confirmButtonColor: '#2563eb',
    })
  } catch (error) {
    console.error(error)

    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Gagal menghapus banner.',
    })
  }
}
</script>

<template>
  <div class="p-10 bg-slate-50 min-h-screen">
    <!-- Header -->
    <div
      class="
        flex
        justify-between
        items-center
        mb-8
      "
    >
      <div>
        <p
          class="
            text-blue-600
            font-semibold
            tracking-[4px]
            uppercase
            mb-2
          "
        >
          Content Management
        </p>

        <h1
          class="
            text-4xl
            font-bold
            text-slate-900
          "
        >
          Manage Banner
        </h1>

        <p
          class="
            text-slate-500
            mt-2
          "
        >
          Kelola banner yang ditampilkan pada halaman customer.
        </p>
      </div>

      <button
        @click="openCreate"
        class="
          flex
          items-center
          gap-2
          bg-blue-600
          text-white
          px-5
          py-3
          rounded-2xl
          shadow-lg
          hover:bg-blue-700
          transition
        "
      >
        <Plus class="w-5 h-5" />
        Tambah Banner
      </button>
    </div>

    <!-- Statistik -->
    <div
      class="
        bg-white
        rounded-[28px]
        p-6
        shadow-sm
        border
        border-slate-100
        mb-8
      "
    >
      <div
        class="
          flex
          justify-between
          items-center
        "
      >
        <div>
          <p class="text-slate-500">
            Total Banner
          </p>

          <h2
            class="
              text-4xl
              font-bold
              mt-2
            "
          >
            {{ banners?.length || 0 }}
          </h2>
        </div>

        <div
          class="
            w-16
            h-16
            rounded-2xl
            bg-blue-100
            flex
            items-center
            justify-center
          "
        >
          <Images
            class="
              w-8
              h-8
              text-blue-600
            "
          />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="showForm"
        class="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/40
          backdrop-blur-sm
          p-6
        "
      >
        <div
          class="
            bg-white
            w-full
            max-w-md
            rounded-[28px]
            p-5
            shadow-2xl
          "
        >
          <div
            class="
              flex
              justify-between
              items-center
              mb-6
            "
          >
            <h2
              class="
                text-2xl
                font-bold
              "
            >
              {{
                editingId
                  ? 'Edit Banner'
                  : 'Tambah Banner'
              }}
            </h2>

            <button
              @click="
                showForm = false;
                resetForm()
              "
              class="
                text-3xl
                text-slate-400
                hover:text-slate-700
              "
            >
              ×
            </button>
          </div>

          <div class="space-y-4">
            <input
              v-model="form.title"
              placeholder="Title"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-3
              "
            />

            <input
              v-model="form.subtitle"
              placeholder="Subtitle"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-3
              "
            />

            <input
              v-model="form.image"
              placeholder="Masukkan URL gambar banner"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-3
              "
            />

            <select
              v-model="form.travelPackageId"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-3
              "
            >
              <option value="">
                Pilih Paket Tujuan
              </option>

              <option
                v-for="pkg in packages"
                :key="pkg.id"
                :value="pkg.id"
              >
                {{ pkg.title }}
              </option>
            </select>

            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Description"
              class="
                w-full
                border
                border-slate-200
                rounded-xl
                p-3
              "
            />

            <div
              class="
                flex
                justify-end
                gap-3
                pt-2
              "
            >
              <button
                @click="
                  showForm = false;
                  resetForm()
                "
                class="
                  px-5
                  py-3
                  rounded-2xl
                  bg-slate-200
                "
              >
                Batal
              </button>

              <button
                @click="saveBanner"
                class="
                  px-5
                  py-3
                  rounded-2xl
                  bg-blue-600
                  text-white
                  hover:bg-blue-700
                "
              >
                Simpan Banner
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Table -->
    <div
      class="
        bg-white
        rounded-[28px]
        overflow-hidden
        shadow-sm
        border
        border-slate-100
      "
    >
      <table class="w-full">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-5 text-left">
              Title
            </th>

            <th class="p-5 text-left">
              Paket Tujuan
            </th>

            <th class="p-5 text-left">
              Image
            </th>

            <th class="p-5 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="banner in banners"
            :key="banner.id"
            class="
              border-t
              hover:bg-slate-50
              transition
            "
          >
            <td class="p-5">
              {{ banner.title }}
            </td>

            <td class="p-5">
              {{
                packages?.find(
                  p =>
                    p.id ===
                    banner.travelPackageId
                )?.title || '-'
              }}
            </td>

            <td class="p-5">
              <img
                :src="
                  banner.image ||
                  'https://placehold.co/120x70'
                "
                class="
                  w-28
                  h-16
                  object-cover
                  rounded-xl
                "
              />
            </td>

            <td class="p-5">
              <div class="flex gap-2">
                <button
                  @click="openEdit(banner)"
                  class="
                    flex
                    items-center
                    gap-2
                    bg-blue-50
                    text-blue-600
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-blue-100
                    transition
                  "
                >
                  <Pencil class="w-4 h-4" />
                  Edit
                </button>

                <button
                  @click="
                    deleteBanner(
                      banner.id
                    )
                  "
                  class="
                    flex
                    items-center
                    gap-2
                    bg-red-50
                    text-red-600
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-red-100
                    transition
                  "
                >
                  <Trash2 class="w-4 h-4" />
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr
            v-if="
              !banners ||
              banners.length === 0
            "
          >
            <td
              colspan="4"
              class="
                text-center
                py-10
                text-slate-500
              "
            >
              Belum ada data banner.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>