<template>
  <ListLayout v-bind="props" />

  <VSnackbar
    v-model="snackbar"
    vertical
  >
    <div class="text-subtitle-1 pb-2">
      <p style="color: #fff;">
        {{ message }}
      </p>
    </div>

    <template #actions>
      <VBtn
        color="primary"
        variant="text"
        @click="snackbar = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import { useStore } from "vuex"
import { onBeforeMount, ref } from "vue"

const snackbar=ref(false)

const headers = [
  { text: "ID", value: "id", sortable: true, width: "150" },
  { text: "Fuel Station", value: "stnName", sortable: true, width: "300" },
  { text: "", value: "operation", width: "150" },
]



const store = useStore()
const items = ref([])
const loading = ref(true)

const message = ref('')

onBeforeMount(async () => {
  await store.dispatch("fetchFuelStations")
  items.value = store.getters.fuelStations
  console.log(items.value)
  loading.value = false
})

const deleteFuelStation = async item =>{
  try{
    await store.dispatch("deleteFuelStation", item.id)
    await store.dispatch("fetchFuelStations")
    items.value = store.getters.fuelStations
    snackbar.value=true
    message.value="Selected Fuel Station has been deleted"
  }catch(error){
    snackbar.value=true
    message.value="Couldn't Delete Fuel Station"
  }
}

const props = {
  header: "Fuel Station List",
  subheader: "This is a list of Fuel Stations registered in the system.",
  button: {
    text: "Add Fuel Station",
    to: "/register-fuel-stations",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
  operation: deleteFuelStation,
}
</script>


