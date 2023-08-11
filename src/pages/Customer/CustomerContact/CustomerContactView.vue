<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { useStore, mapActions } from "vuex"
  
const headers = [ 
  { text: "Customer Name", value: "customerID.cmrName", sortable: true },
  { text: "Contact Name", value: "cntName", sortable: true },
  { text: "Contact Phone", value: "cntPhone", sortable: true },
]

const store = useStore()

const loading = ref(false)

const { fetchCustomers } = mapActions('FOModule', ['fetchCustomers'])

const items = ref([])

onMounted(() => {
  try {
    loading.value = true
    store.dispatch('fetchCustomerContacts')
    items.value = store.getters.customerContacts
    console.log(store.getters.customerContacts)
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
  subheader: "This is a list of all Customer Contacts registered in the system.",
  button: {
    text: "Add Customer Contacts",
    to: '/register-customer-contact',
  },
  tableHeader: {
    headers,
    items,
  },

  clickedRow: edit,
  loading: loading.value,

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
