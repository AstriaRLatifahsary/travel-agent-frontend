<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

const {
  data: packages,
  refresh,
} = await useFetch(
  'http://localhost:3333/admin/travel-packages'
)

const showForm = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  title: '',
  destination: '',
  description: '',
  price: '',
  duration: '',
  quota: '',
  facilities: '',
  image: '',
  isActive: true,
})

function resetForm() {
  form.title = ''
  form.destination = ''
  form.description = ''
  form.price = ''
  form.duration = ''
  form.quota = ''
  form.facilities = ''
  form.image = ''
  form.isActive = true

  editingId.value = null
}

function openCreate() {
  resetForm()
  showForm.value = true
}

function openEdit(pkg: any) {
  editingId.value = pkg.id

  form.title = pkg.title
  form.destination = pkg.destination
  form.description = pkg.description
  form.price = pkg.price
  form.duration = pkg.duration
  form.quota = pkg.quota
  form.facilities = pkg.facilities
  form.image = pkg.image
  form.isActive = !!pkg.isActive

  showForm.value = true
}

async function savePackage() {
  const payload = {
    title: form.title,
    destination: form.destination,
    description: form.description,
    price: Number(form.price),
    duration: form.duration,
    quota: Number(form.quota),
    facilities: form.facilities,
    image: form.image,
    isActive: form.isActive,
  }

  if (editingId.value) {
    await $fetch(
      `http://localhost:3333/admin/travel-packages/${editingId.value}`,
      {
        method: 'PUT',
        body: payload,
      }
    )
  } else {
    await $fetch(
      'http://localhost:3333/admin/travel-packages',
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

async function deletePackage(id: number) {
  if (!confirm('Yakin ingin menghapus paket?')) return

  await $fetch(
    `http://localhost:3333/admin/travel-packages/${id}`,
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
        Manage Paket Traveling
      </h1>

      <button
        @click="openCreate"
        class="bg-blue-500 text-white px-5 py-2 rounded"
      >
        Tambah Paket
      </button>
    </div>

    <div
      v-if="showForm"
      class="bg-white shadow rounded p-6 mb-8"
    >
      <div class="space-y-4">
        <input
          v-model="form.title"
          placeholder="Title"
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.destination"
          placeholder="Destination"
          class="border p-3 w-full rounded"
        />

        <textarea
          v-model="form.description"
          placeholder="Description"
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.price"
          placeholder="Price"
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.duration"
          placeholder="Duration"
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.quota"
          placeholder="Quota"
          class="border p-3 w-full rounded"
        />

        <textarea
          v-model="form.facilities"
          placeholder="Facilities"
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.image"
          placeholder="Image URL"
          class="border p-3 w-full rounded"
        />

        <label class="flex gap-2">
          <input
            type="checkbox"
            v-model="form.isActive"
          />
          Active
        </label>

        <button
          @click="savePackage"
          class="bg-green-500 text-white px-5 py-2 rounded"
        >
          Simpan
        </button>
      </div>
    </div>

    <table class="w-full border bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-4">Title</th>
          <th class="p-4">Destination</th>
          <th class="p-4">Price</th>
          <th class="p-4">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="pkg in packages"
          :key="pkg.id"
          class="border-t"
        >
          <td class="p-4">
            {{ pkg.title }}
          </td>

          <td class="p-4">
            {{ pkg.destination }}
          </td>

          <td class="p-4">
            Rp {{ pkg.price }}
          </td>

          <td class="p-4">
            <button
              @click="openEdit(pkg)"
              class="text-blue-500 mr-4"
            >
              Edit
            </button>

            <button
              @click="deletePackage(pkg.id)"
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