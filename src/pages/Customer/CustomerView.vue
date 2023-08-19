<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { useStore, mapActions } from "vuex"
  
const headers = [
  { text: "Customer Code", value: "cmrCode", sortable: true },  
  { text: "Customer Name", value: "cmrName", sortable: true },
  { text: "TIN Number", value: "cmrTIN", sortable: true },
  { text: "Address", value: "cmrAddress", sortable: true },
  { text: "Phone Number", value: "cmrPhone", sortable: true },
]

const store = useStore()

const loading = ref(true)

const { fetchCustomers } = mapActions('FOModule', ['fetchCustomers'])

const items = ref([])

onMounted(() => {
  try {
    store.dispatch('fetchCustomers')
    items.value = store.getters.customers
    console.log(store.getters.customers)
  } catch (err) {
    console.error('Error dispatching fetchCustomers action:', err)
  } finally {
    loading.value = false
  }

})



const edit = clickedRow => {
  console.log(clickedRow)
  router.push({ name: 'edit-customer', params: { id: clickedRow.id } })
}

const props = {
  header: "Customer List",
  subheader: "This is a list of all Customer registered in the system.",
  button: {
    text: "Add Customer",
    to: '/register-customer',
  },
  tableHeader: {
    headers,
    items,
  },

  clickedRow: edit,
  loading: loading,

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
