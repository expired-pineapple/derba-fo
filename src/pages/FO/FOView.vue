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
  { text: "FO Number", value: "foNo", sortable: true },
  { text: "Customer", value: "CustomerID", sortable: true },
  { text: "Material", value: "MtrId", sortable: true },
  { text: "Truck", value: "TrkId", sortable: true },
  { text: "Trip", value: "TrpId", sortable: true },
  { text: "FO Date", value: "foDate", sortable: true },
  { text: "FO Time", value: "foTime", sortable: true },
  { text: "FO Open KM", value: "foOpenKm", sortable: true },
  { text: "FO Close KM", value: "foCloseKm", sortable: true },
  { text: "FO Quantity", value: "foMtrQuantity", sortable: true },
  { text: "Waybill No.", value: "foWbNo", sortable: true },
  { text: "Waybill Bill", value: "foWbBill", sortable: true },
]

const items = []


const props = {
  header: "Shipment View",
  subheader: "This is a list of shipment registered in the system.",
  button: {
    text: "Add Shipment",
    to: "/shipment-form",
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
}
</script>
