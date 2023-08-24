<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import { useStore } from "vuex"
import { onBeforeMount, ref } from "vue"
import router from "@/router"

const headers = [
  { text: "ID", value: "id", sortable: true, width: "50" },
  { text: "User", value: "fullName", sortable: true, width: "150" },
  { text: "Action", value: "action", sortable: true, width: "250" },
  { text: "Timestamp", value: "timestamp", sortable: true, width: "100" },

]

const store = useStore()
const items = ref([])
const loading = ref(true)

onBeforeMount(async () => {
  await store.dispatch("fetchUserLogs")
  items.value = store.getters.userLogs
  console.log(items.value)
  loading.value = false
})


const props = {
  header: "User Log List",
  subheader: "This is a list of User Logs registered in the system.",
  buttonVisible: false,
  tableHeader: {
    headers,
    items,
  },
  loading,
}
</script>


