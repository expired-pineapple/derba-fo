<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import { useStore } from "vuex"
import { onBeforeMount, ref } from "vue"
import router from "@/router"

const headers = [
  { text: "Material Name", value: "mtrName", sortable: true, width: "150" },
  { text: "Material Category", value: "mtrCat.mtrCatCol", sortable: true },
  { text: "Packaging", value: "mtrPackaging", sortable: true },
]

const store = useStore()
const items = ref([])
const loading = ref(true)

onBeforeMount(async () => {
  await store.dispatch("fetchCommodities")
  items.value = store.getters.commodities
  loading.value = false
})

const clickedRow = (item: any) => {
  router.push(`/comodities/${item.id}`)
}

const props = {
  header: "Comodity List",
  subheader: "This is a list of comodities registered in the system.",
  button: {
    text: "Add Comodity",
    to: "/register-comodity",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
  clickedRow:clickedRow
}
</script>


