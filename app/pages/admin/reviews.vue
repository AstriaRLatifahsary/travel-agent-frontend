<script setup lang="ts">
import {
  MessageSquare,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-vue-next'

import Swal from 'sweetalert2'

import type {
  Review,
} from '~/types/review'

import type {
  TravelPackage,
} from '~/types/travel-package'

definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

const {
  data: reviews,
  refresh,
} = await useFetch<
  Review[]
>(
  'http://localhost:3333/admin/reviews'
)

const {
  data: packages,
} = await useFetch<
  TravelPackage[]
>(
  'http://localhost:3333/admin/travel-packages'
)

const showForm = ref(false)

const editingId = ref<
  number | null
>(null)

const form = reactive({
  travelPackageId:
    null as number | null,

  customerName: '',
  comment: '',
  rating:
    null as number | null,
})

function resetForm() {
  form.travelPackageId = null
  form.customerName = ''
  form.comment = ''
  form.rating = null

  editingId.value = null
}

function openCreate() {
  resetForm()
  showForm.value = true
}

function openEdit(
  review: Review
) {
  editingId.value = review.id

  form.travelPackageId =
    review.travelPackageId

  form.customerName =
    review.customerName ?? ''

  form.comment =
    review.comment ?? ''

  form.rating =
    review.rating ?? null

  showForm.value = true
}

async function saveReview() {
  if (!form.travelPackageId) {
    await Swal.fire({
      icon: 'warning',
      title: 'Pilih Paket',
      text:
        'Silakan pilih paket terlebih dahulu.',
      confirmButtonColor:
        '#2563eb',
    })

    return
  }

  if (
    !form.customerName ||
    !form.comment ||
    !form.rating
  ) {
    await Swal.fire({
      icon: 'warning',
      title:
        'Data Belum Lengkap',
      text:
        'Silakan lengkapi seluruh data review.',
      confirmButtonColor:
        '#2563eb',
    })

    return
  }

  if (
    form.rating < 1 ||
    form.rating > 5
  ) {
    await Swal.fire({
      icon: 'warning',
      title:
        'Rating Tidak Valid',
      text:
        'Rating harus berada di antara 1 sampai 5.',
      confirmButtonColor:
        '#2563eb',
    })

    return
  }

  const payload = {
    travel_package_id:
      form.travelPackageId,

    customer_name:
      form.customerName,

    customer_photo: null,

    comment:
      form.comment,

    rating:
      form.rating,
  }

  try {
    if (editingId.value) {
      await $fetch(
        `http://localhost:3333/admin/reviews/${editingId.value}`,
        {
          method: 'PUT',
          body: payload,
        }
      )
    } else {
      await $fetch(
        'http://localhost:3333/admin/reviews',
        {
          method: 'POST',
          body: payload,
        }
      )
    }

    showForm.value = false

    resetForm()

    await refresh()

    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text:
        'Review berhasil disimpan.',
      confirmButtonColor:
        '#2563eb',
    })
  } catch (error) {
    console.error(error)

    await Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text:
        'Gagal menyimpan review.',
      confirmButtonColor:
        '#2563eb',
    })
  }
}

async function deleteReview(
  id: number
) {
  const result =
    await Swal.fire({
      title: 'Hapus Review?',
      text:
        'Data yang dihapus tidak dapat dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText:
        'Hapus',
      cancelButtonText:
        'Batal',
      confirmButtonColor:
        '#ef4444',
    })

  if (!result.isConfirmed) {
    return
  }

  try {
    await $fetch(
      `http://localhost:3333/admin/reviews/${id}`,
      {
        method: 'DELETE',
      }
    )

    await refresh()

    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text:
        'Review berhasil dihapus.',
      confirmButtonColor:
        '#2563eb',
    })
  } catch (error) {
    console.error(error)

    await Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text:
        'Gagal menghapus review.',
      confirmButtonColor:
        '#2563eb',
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
          Testimonial Management
        </p>

        <h1
          class="
            text-4xl
            font-bold
            text-slate-900
          "
        >
          Manage Review Customer
        </h1>

        <p
          class="
            text-slate-500
            mt-2
          "
        >
          Kelola review dan testimonial customer.
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
        Tambah Review
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
            Total Review
          </p>

          <h2
            class="
              text-4xl
              font-bold
              mt-2
            "
          >
            {{ reviews?.length || 0 }}
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
          <MessageSquare
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
          bg-black/40
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-6
        "
      >
        <div
          class="
            bg-white
            w-full
            max-w-lg
            rounded-[28px]
            p-6
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
                  ? 'Edit Review'
                  : 'Tambah Review'
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
              "
            >
              ×
            </button>
          </div>

          <div class="space-y-4">

            <select
              v-model="form.travelPackageId"
              class="
                border
                p-3
                w-full
                rounded-xl
              "
            >
              <option value="">
                Pilih Paket
              </option>

              <option
                v-for="pkg in packages"
                :key="pkg.id"
                :value="pkg.id"
              >
                {{ pkg.title }}
              </option>
            </select>

            <input
              v-model="form.customerName"
              placeholder="Customer Name"
              class="
                border
                p-3
                w-full
                rounded-xl
              "
            />

            <textarea
              v-model="form.comment"
              rows="3"
              placeholder="Comment"
              class="
                border
                p-3
                w-full
                rounded-xl
              "
            />

            <input
              v-model="form.rating"
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              class="
                border
                p-3
                w-full
                rounded-xl
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
                @click="saveReview"
                class="
                  px-5
                  py-3
                  rounded-2xl
                  bg-blue-600
                  text-white
                "
              >
                Simpan Review
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
              Customer
            </th>

            <th class="p-5 text-left">
              Paket
            </th>

            <th class="p-5 text-left">
              Rating
            </th>

            <th class="p-5 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="review in reviews"
            :key="review.id"
            class="
              border-t
              hover:bg-slate-50
            "
          >
            <td class="p-5">
              <div
                class="
                  flex
                  items-center
                  gap-3
                "
              >
                <img
                :src="`https://ui-avatars.com/api/?name=${review.customerName}&background=2563eb&color=ffffff`"
                  class="
                    w-10
                    h-10
                    rounded-full
                    object-cover
                  "
                />

                {{ review.customerName || 'Anonymous' }}
              </div>
            </td>

            <td class="p-5">
              <span
                v-if="review.travelPackage"
                class="text-slate-700"
              >
                {{ review.travelPackage.title }}
              </span>

              <span
                v-else
                class="text-red-500"
              >
                Paket tidak ditemukan
              </span>
            </td>

            <td class="p-5">
              ⭐ {{ review.rating }}/5
            </td>

            <td class="p-5">
              <div class="flex gap-2">
                <button
                  @click="
                    openEdit(review)
                  "
                  class="
                    flex
                    items-center
                    gap-2
                    bg-blue-50
                    text-blue-600
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  <Pencil
                    class="w-4 h-4"
                  />
                  Edit
                </button>

                <button
                  @click="
                    deleteReview(
                      review.id
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
                  "
                >
                  <Trash2
                    class="w-4 h-4"
                  />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>