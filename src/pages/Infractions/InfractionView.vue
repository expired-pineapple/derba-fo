<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { onBeforeMount, ref } from "vue"
import { useStore } from "vuex"

const headers = [
  { text: "Driver", value: "driverID.driver_name", sortable: true },
  { text: "Infraction Type", value: "infractionType.infractionType", sortable: true },
  { text: "Infraction Date", value: "infractionDate", sortable: true },
  { text: "Infraction Location", value: "infractionLocation", sortable: true },
  { text: "Infraction Notes", value: "infractionNote", sortable: true },
]

const items = ref([])
const loading = ref(true)
const store = useStore()

onBeforeMount(async () => {
  try {
    const response = await store.dispatch("infractions/getInfractions")

    items.value = response.data
    loading.value = false
  } catch (error) {
    console.log(error)
  } 
})


const props = {
  header: "Infraction View",
  subheader: "This is a list of infractions registered in the system.",
  button: {
    text: "Add Infractions",
    to: "/register-infractions",
  },
  tableHeader: {
    headers,
    items,

  },
}
</script>
