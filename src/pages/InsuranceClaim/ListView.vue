<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import { useStore } from "vuex"
import { onBeforeMount, ref } from "vue"
import router from "@/router"

const headers = [
  { text: "ID", value: "id", sortable: true },
  { text: "Truck ID", value: "truckId", sortable: true },
  { text: "User ID", value: "userId", sortable: true },
  { text: "Claim Date", value: "claimDate", sortable: true },
  { text: "Insurance Provider", value: "insuranceProvider", sortable: true },
  { text: "Status", value: "status", sortable: true },
  { text: "Claim Remark", value: "claimRemark", sortable: true },
]

const store = useStore()
const items = ref([])
const loading = ref(true)

onBeforeMount(async () => {
  await store.dispatch("fetchInsurances")
  items.value = store.getters.insurances
  loading.value = false
})


const props = {
  header: "Insurance Claim List",
  subheader: "This is a list of Insurance Claims registered in the system.",
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


