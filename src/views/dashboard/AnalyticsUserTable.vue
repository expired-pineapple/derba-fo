<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import router from "@/router"
import { ref, onMounted, computed } from "vue"
import { mapActions, useStore } from 'vuex'

import ListLayout from "@/views/pages/page-layout/ListLayout.vue"

const searchField = ref("")
const searchValue = ref("")
const loading = ref(true)

const headers = [
  { text: "Driver DMC ID", value: "driver_dmc_id", sortable: true },
  { text: "Full Name", value: "driver_name", sortable: true },
  { text: "Job Title", value: "Job_title", sortable: true },
  { text: "Department", value: "department", sortable: true },
  { text: "Phone", value: "phone" },
  { text: "Permanent Residence", value: "permanent_residence" },
  { text: "Employment Status", value: "employment_status",  sortable: true  },
]

const store = useStore()

onMounted(async () => {
  try {
    await store.dispatch("fetchDrivers")
    loading.value = !loading.value  
  } catch (err) {
  }
})

const items = computed(() => store.getters.drivers)

const clickedRow = ref({})

const editDriver = clickedRow => {
  router.push({ name: "driver-edit", params: { id: clickedRow.id } })
}

const props = {
  header: "Driver List",
  subheader: "This is a list of all drivers in the system.",
  button: {
    text: "Add Driver",
    to: '/register-drivers',
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
  clickedRow: editDriver,
  loading: loading,
  rows: 10,
  buttonVisible: false,
}
</script>

<style scoped>
.search {
  padding: 5px;
  border-block-end: 1px solid #0f8e3d;
  inline-size: 100%;
  margin-block-end: 10px;
}

.search-field {
  padding: 5px;
  border-block-end: none;
  font-size: 0.8rem;
  inline-size: 60%;
}

.search-field:focus {
  outline: none;
}
</style>
