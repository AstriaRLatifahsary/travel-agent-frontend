<script setup lang="ts">
import {
  Plane,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-vue-next'
import Swal from 'sweetalert2'

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

  try {
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

    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Data paket berhasil disimpan.',
      confirmButtonColor: '#2563eb',
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Gagal menyimpan data.',
    })
  }
}

async function deletePackage(id: number) {
  const result =
    await Swal.fire({
      title: 'Hapus Paket?',
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

  await $fetch(
    `http://localhost:3333/admin/travel-packages/${id}`,
    {
      method: 'DELETE',
    }
  )

  refresh()

  Swal.fire({
    icon: 'success',
    title: 'Berhasil',
    text: 'Paket berhasil dihapus.',
    confirmButtonColor: '#2563eb',
  })
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
          Product Management
        </p>

        <h1
          class="
            text-4xl
            font-bold
            text-slate-900
          "
        >
          Manage Paket Traveling
        </h1>

        <p
          class="
            text-slate-500
            mt-2
          "
        >
          Kelola seluruh paket wisata yang tersedia.
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
        Tambah Paket
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
            Total Paket Wisata
          </p>

          <h2
            class="
              text-4xl
              font-bold
              mt-2
            "
          >
            {{ packages?.length || 0 }}
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
          <Plane
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
            max-h-[90vh]
            overflow-y-auto
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
                  ? 'Edit Paket'
                  : 'Tambah Paket'
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
            <input
              v-model="form.title"
              placeholder="Title"
              class="border p-3 w-full rounded-xl"
            />

            <input
              v-model="form.destination"
              placeholder="Destination"
              class="border p-3 w-full rounded-xl"
            />

            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Description"
              class="border p-3 w-full rounded-xl"
            />

            <input
              v-model="form.price"
              placeholder="Price"
              class="border p-3 w-full rounded-xl"
            />

            <input
              v-model="form.duration"
              placeholder="Duration"
              class="border p-3 w-full rounded-xl"
            />

            <input
              v-model="form.quota"
              placeholder="Quota"
              class="border p-3 w-full rounded-xl"
            />

            <textarea
              v-model="form.facilities"
              rows="3"
              placeholder="Facilities"
              class="border p-3 w-full rounded-xl"
            />

            <input
              v-model="form.image"
              placeholder="Image URL"
              class="border p-3 w-full rounded-xl"
            />

            <label
              class="
                flex
                items-center
                gap-3
              "
            >
              <input
                type="checkbox"
                v-model="form.isActive"
              />

              <span>Active</span>
            </label>

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
                @click="savePackage"
                class="
                  px-5
                  py-3
                  rounded-2xl
                  bg-blue-600
                  text-white
                "
              >
                Simpan Paket
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
              Destination
            </th>

            <th class="p-5 text-left">
              Price
            </th>

            <th class="p-5 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="pkg in packages"
            :key="pkg.id"
            class="
              border-t
              hover:bg-slate-50
            "
          >
            <td class="p-5">
              {{ pkg.title }}
            </td>

            <td class="p-5">
              {{ pkg.destination }}
            </td>

            <td class="p-5">
              Rp
              {{
                Number(
                  pkg.price
                ).toLocaleString(
                  'id-ID'
                )
              }}
            </td>

            <td class="p-5">
              <div class="flex gap-2">
                <button
                  @click="openEdit(pkg)"
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
                    deletePackage(
                      pkg.id
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