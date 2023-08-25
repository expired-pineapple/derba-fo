<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import { useStore } from "vuex"
import { onBeforeMount, ref } from "vue"

const headers = [
  { text: "ID", value: "id", sortable: true, width: "150" },
  { text: "Insurance Provider", value: "insuranceProvider", sortable: true, width: "150" },
]

const store = useStore()
const items = ref([])
const loading = ref(true)

onBeforeMount(async () => {
  try{
    const response = await store.dispatch("fetchInsuranceProviders")

    items.value = response.data
    loading.value = false
  }catch(error){
    console.log(error)
  }
})


const props = {
  header: "Insurance Provider List",
  subheader: "This is a list of Insurance Providers registered in the system.",
  button: {
    text: "Add Insurance Provider",
    to: "/register-insurance-provider",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
}
</script>


