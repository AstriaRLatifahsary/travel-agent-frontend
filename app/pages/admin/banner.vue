<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

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
})

function resetForm() {
  form.title = ''
  form.subtitle = ''
  form.image = ''
  form.description = ''

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

  showForm.value = true
}

async function saveBanner() {
  const payload = {
    title: form.title,
    subtitle: form.subtitle,
    image: form.image,
    description: form.description,
  }

  try {
    if (editingId.value) {
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
  const confirmDelete = confirm(
    'Yakin ingin menghapus banner ini?'
  )

  if (!confirmDelete) return

  try {
    await $fetch(
      `http://localhost:3333/admin/banners/${id}`,
      {
        method: 'DELETE',
      }
    )

    refresh()
  } catch (error) {
    console.error(error)
    alert('Gagal menghapus data')
  }
}
</script>

<template>
  <div class="p-10">

    <div class="flex justify-between mb-8">
      <h1 class="text-4xl font-bold">
        Manage Banner
      </h1>

      <button
        @click="openCreate"
        class="bg-blue-500 text-white px-5 py-2 rounded"
      >
        Tambah Banner
      </button>
    </div>

    <!-- FORM -->

    <div
      v-if="showForm"
      class="bg-white p-6 rounded shadow mb-8"
    >
      <h2 class="text-2xl font-bold mb-5">
        {{ editingId ? 'Edit Banner' : 'Tambah Banner' }}
      </h2>

      <div class="space-y-4">

        <input
          v-model="form.title"
          placeholder="Title"
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.subtitle"
          placeholder="Subtitle"
          class="border p-3 w-full rounded"
        />

        <input
          v-model="form.image"
          placeholder="Image URL"
          class="border p-3 w-full rounded"
        />

        <textarea
          v-model="form.description"
          placeholder="Description"
          class="border p-3 w-full rounded"
        />

        <div class="space-x-3">

          <button
            @click="saveBanner"
            class="bg-green-500 text-white px-5 py-2 rounded"
          >
            Simpan
          </button>

          <button
            @click="showForm = false"
            class="bg-gray-500 text-white px-5 py-2 rounded"
          >
            Batal
          </button>

        </div>
      </div>
    </div>

    <!-- TABLE -->

    <table class="w-full border bg-white">

      <thead class="bg-gray-100">
        <tr>
          <th class="p-4">Title</th>
          <th class="p-4">Subtitle</th>
          <th class="p-4">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="banner in banners"
          :key="banner.id"
          class="border-t"
        >
          <td class="p-4">
            {{ banner.title }}
          </td>

          <td class="p-4">
            {{ banner.subtitle }}
          </td>

          <td class="p-4">

            <button
              @click="openEdit(banner)"
              class="text-blue-500 mr-4"
            >
              Edit
            </button>

            <button
              @click="deleteBanner(banner.id)"
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