<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref } from "vue"


const searchField = ref("")
const searchValue = ref("")
  
const headers = [
  { text: "Customer Code", value: "CmrCode", sortable: true },  
  { text: "Customer Name", value: "CmrName", sortable: true },
  { text: "TIN Number", value: "CmrTIN", sortable: true },
  { text: "Address", value: "CmrAddress", sortable: true },
  { text: "Phone Number", value: "CmrPhone", sortable: true },
]

const items =
  [
    {
      "CmrCode": "C0001",
      "CmrName": "Ethiopian Construction Works Corporation",
      "CmrTIN": "000111222333",
      "CmrAddress": "Addis Ababa, Ethiopia",
      "CmrPhone": "+251 11 123 4567",
    },
    {
      "CmrCode": "C0002",
      "CmrName": "Yotek Construction PLC",
      "CmrTIN": "000222333444",
      "CmrAddress": "Addis Ababa, Ethiopia",
      "CmrPhone": "+251 11 123 4567",
    },
    {
      "CmrCode": "C0004",
      "CmrName": "Sunshine Construction PLC",
      "CmrTIN": "000444555666",
      "CmrAddress": "Mekelle, Ethiopia",
      "CmrPhone": "+251 34 123 4567",
    },
    {
      "CmrCode": "C0006",
      "CmrName": "Ethiopian Roads Authority",
      "CmrTIN": "000666777888",
      "CmrAddress": "Addis Ababa, Ethiopia",
      "CmrPhone": "+251 11 123 4567",
    },
    {
      "CmrCode": "C0007",
      "CmrName": "Addis Ababa Housing Development Project Office",
      "CmrTIN": "000777888999",
      "CmrAddress": "Addis Ababa, Ethiopia",
      "CmrPhone": "+251 11 123 4567",
    },
    {
      "CmrCode": "C0008",
      "CmrName": "Dire Dawa Housing Development Project Office",
      "CmrTIN": "000888999000",
      "CmrAddress": "Dire Dawa, Ethiopia",
      "CmrPhone": "+251 25 123 4567",
    },
    {
      "CmrCode": "C0009",
      "CmrName": "Oromia Housing Development Project Office",
      "CmrTIN": "000999000111",
      "CmrAddress": "Adama, Ethiopia",
      "CmrPhone": "+251 22 123 4567",
    },
    {
      "CmrCode": "C0010",
      "CmrName": "Eastern Industry Zone Development PLC",
      "CmrTIN": "001111222333",
      "CmrAddress": "Dukem, Ethiopia",
      "CmrPhone": "+251 11 123 4567",
    },
  ]

const registerForm = () => {
  router.push('/register-customer')
}

const clickedRow = ref({})

const editDriver = clickedRow => {
  console.log(clickedRow)
  router.push({ name: "driver-edit", params: { id: clickedRow.id } })
}

const props = {
  header: "Customer List",
  subheader: "This is a list of all Customer registered in the system.",
  button: {
    text: "Add Customer",
    onClick: registerForm,
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
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
