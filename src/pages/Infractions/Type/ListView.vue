<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import { useStore } from "vuex"
import { onBeforeMount, ref } from "vue"

const headers = [
  { text: "ID", value: "id", sortable: true, width: "150" },
  { text: "Infraction Type", value: "infractionType", sortable: true, width: "150" },
  { text: "", value: "operation", sortable: false, width: "150" },
]


const store = useStore()
const items = ref([])
const loading = ref(true)

onBeforeMount(async () => {
  try {
    await store.dispatch('fetchInfractionTypes')
    items.value = store.getters.infractionTypes
    loading.value = false
  } catch (error) {
    console.log(error)
  }
})

const deleteInfractionType = async item => {
  try {
    await store.dispatch('deleteInfractionType', item.id)

    await store.dispatch('fetchInfractionTypes')

    items.value = store.getters.infractionTypes
  } catch (error) {
    console.log(error)
  }
}

const props = {
  header: "InfractionType List",
  subheader: "This is a list of Infraction Types registered in the system.",
  button: {
    text: "Add Infraction Type",
    to: "/register-infraction-type",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
  operation: deleteInfractionType,
}
</script>


