<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import { useStore } from "vuex"
import { onBeforeMount, ref } from "vue"
import router from "@/router"

const headers = [
  { text: "ID", value: "id", sortable: true, width: "150" },
  { text: "Category Name", value: "mtrCatCol", sortable: true, width: "150" },
]

const store = useStore()
const items = ref([])
const loading = ref(true)

onBeforeMount(async () => {
  await store.dispatch("fetchMtrcats")
  items.value = store.getters.mtrcats
  loading.value = false
})


const props = {
  header: "Comodity Category List",
  subheader: "This is a list of Comodity Categories registered in the system.",
  button: {
    text: "Add Category",
    to: "/register-category",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
}
</script>


