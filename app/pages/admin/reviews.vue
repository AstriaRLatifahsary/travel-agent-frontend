<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

const {
  data: reviews,
  refresh,
} = await useFetch(
  'http://localhost:3333/admin/reviews'
)

const {
  data: packages,
} = await useFetch(
  'http://localhost:3333/admin/travel-packages'
)

const showForm = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  travelPackageId: '',
  customerName: '',
  customerPhoto: '',
  comment: '',
  rating: '',
})

function resetForm() {
  form.travelPackageId = ''
  form.customerName = ''
  form.customerPhoto = ''
  form.comment = ''
  form.rating = ''

  editingId.value = null
}

function openCreate() {
  resetForm()
  showForm.value = true
}

function openEdit(review: any) {
  editingId.value = review.id

  form.travelPackageId =
    review.travelPackageId

  form.customerName =
    review.customerName

  form.customerPhoto =
    review.customerPhoto

  form.comment =
    review.comment

  form.rating =
    review.rating

  showForm.value = true
}

async function saveReview() {
  const payload = {
    travelPackageId: Number(
      form.travelPackageId
    ),
    customerName: form.customerName,
    customerPhoto: form.customerPhoto,
    comment: form.comment,
    rating: Number(form.rating),
  }

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
  refresh()
}

async function deleteReview(id: number) {
  if (!confirm('Yakin hapus review?'))
    return

  await $fetch(
    `http://localhost:3333/admin/reviews/${id}`,
    {
      method: 'DELETE',
    }
  )

  refresh()
}
</script>

<template>
  <div class="p-10">
    <div class="flex justify-between mb-8">
      <h1 class="text-4xl font-bold">
        Manage Review Customer
      </h1>

      <button
        @click="openCreate"
        class="bg-blue-500 text-white px-5 py-2 rounded"
      >
        Tambah Review
      </button>
    </div>

    <div
      v-if="showForm"
      class="bg-white shadow rounded p-6 mb-8"
    >
      <div class="space-y-4">
        <select
          v-model="form.travelPackageId"
          class="border p-3 w-full rounded"
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
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.customerPhoto"
          placeholder="Photo URL"
          class="border p-3 w-full rounded"
        />

        <textarea
          v-model="form.comment"
          placeholder="Comment"
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.rating"
          placeholder="Rating"
          class="border p-3 w-full rounded"
        />

        <button
          @click="saveReview"
          class="bg-green-500 text-white px-5 py-2 rounded"
        >
          Simpan
        </button>
      </div>
    </div>

    <table class="w-full border bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-4">Customer</th>
          <th class="p-4">Paket</th>
          <th class="p-4">Rating</th>
          <th class="p-4">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="review in reviews"
          :key="review.id"
          class="border-t"
        >
          <td class="p-4">
            {{ review.customerName }}
          </td>

          <td class="p-4">
            {{ review.travelPackage.title }}
          </td>

          <td class="p-4">
            ⭐ {{ review.rating }}
          </td>

          <td class="p-4">
            <button
              @click="openEdit(review)"
              class="text-blue-500 mr-4"
            >
              Edit
            </button>

            <button
              @click="deleteReview(review.id)"
              class="text-red-500"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>