<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import { ref } from "vue"

import router from "@/router"
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
  
const djiboutPassProps = defineProps({
  djiboutPass: {
    type: Array,
    required: true,
  },
})


const headers = [
  { text: "Djibouti Passport Number", value: "drvDjiboutiPassNo", sortable: true },
  { text: "Djibouti Passport Issuance Date", value: "drvDjiboutiPIssuanceDate", sortable: true },
  { text: "Djibouti Passport Expiry Date", value: "drvDjiboutiPExpDate", sortable: true },
  { text: "Active Status", value: "drvDjiboutiPActiveStatus", sortable: true },

]


const items = ref(djiboutPassProps.djiboutPass)

const props = {
  buttonVisible: false,
 
  tableHeader: {
    headers,
    items,
  },
  rows: 5,
  clickedRow: {
    id: "",
    name: "",
  },
  searchVisible: false,
}
</script>
