<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onBeforeMount } from "vue"
import { useStore, mapActions } from "vuex"
  
const headers = [ 
  { text: "Customer Name", value: "customerID.cmrName", sortable: true },
  { text: "Contact Name", value: "cntName", sortable: true },
  { text: "Contact Phone", value: "cntPhone", sortable: true },
  { text: "", value: "operation" },
]

const store = useStore()

const loading = ref(true)

const { fetchCustomers } = mapActions('FOModule', ['fetchCustomers'])

const items = ref([])

onBeforeMount(() => {
  try {
    store.dispatch('fetchCustomerContacts')
    items.value = store.getters.customerContacts
  } catch (err) {
    loading.value = false
  } finally {
    loading.value = false
  }

})

const deleteItem = async item => {
  try {
    await store.dispatch('deleteCustomerContact', item.id)
    items.value = store.getters.customerContacts
    await store.dispatch('fetchCustomerContacts')
  } catch (err) {
  }
}



const edit = clickedRow => {
  router.push({ name: 'edit-customer', params: { id: clickedRow.id } })
}

const props = {
  header: "Customer List",
  subheader: "This is a list of all Customer Contacts registered in the system.",
  button: {
    text: "Add Customer Contacts",
    to: '/register-customer-contact',
  },
  tableHeader: {
    headers,
    items,
  },

  loading: loading,
  operation: deleteItem,
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

