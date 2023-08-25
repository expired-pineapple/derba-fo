<template>
  <VCard title="Freight Order Report">
    <VCardText>
      <VForm class="d-flex mb-4"
      @submit.prevent="handleDownloadPDF"
      >
        <VTextField
          v-model="initialDate"
          label="Initial Date"
          clearable
          variant="outlined"
          hide-details
          type="date"
          class="mr-2"
          :rules="[required]"
        />
        <VTextField
          v-model="finalDate"
          label="Final Date"
          clearable
          variant="outlined"
          hide-details
          type="date"
          :rules="[required]"
        />
        <VBtn
          variant="outline"
          color="primary"
          class="ml-2"
          type="submit"
        >
          <VIcon>mdi-download</VIcon>
          Download Report
        </VBtn>
      </VForm>
      <EasyDataTable
        table-class-name="customize-table"
        rows-per-page="10"
        :headers="headers"
        :items="items"
        :loading="loading"
        :search-field="searchField"
        :search-value="searchValue"
      >
        <template #loading>
          <p>Loading Data</p>
        </template>
        <template #empty-message>
          <div class="text-center">
            <p>No Data found.</p>
          </div>
        </template>
      </EasyDataTable>
    </VCardText>
  </VCard>
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted, onBeforeMount } from "vue"
import { useStore } from 'vuex'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

const headers = [
  { text: 'Shipment Code', value: 'ShipmentCode', sortable: true },
  { text: 'FO No', value: 'foNo' },
  { text: 'Customer', value: 'CustomerID.cmrName' },
  { text: 'Material', value: 'MtrId.mtrName' },
  { text: 'Trip', value: 'TrpId.trpRouteName' },
  { text: 'FO Date', value: 'foDate', sortable: true },
  { text: 'FO Time', value: 'foTime' },
  { text: 'Open Km', value: 'foOpenKm' },
  { text: 'Return Date', value: 'foRtnDate' },
  { text: 'Return Time', value: 'foRtnTime' },
  { text: 'Close Km', value: 'foCloseKm' },
  { text: 'Meter Quantity', value: 'foMtrQuantity' },
]


const store = useStore()
const items = ref([])
const loading = ref(true)

const initialDate = ref(null)
const finalDate = ref(null)

const required = (v: Date) => !!v || 'This field is required'

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchFos")
    items.value = store.getters.fos
  } catch (err) {
    console.error("Error dispatching fetch action:", err)
  } finally {
    loading.value = false
  }
})

const handleDownloadPDF = () => {
  if (!initialDate.value || !finalDate.value) {
    return
  }
  const doc = new jsPDF()

  // Add logo and text to the PDF
  const logoImg = new Image()

  logoImg.src = './logo.png'

  logoImg.onload = function() {
    doc.addImage(logoImg, 'PNG', 10, 20, 20, 20) 
    doc.setFontSize(20)
    doc.text('Derba Midroc Group', 30, 25)
    doc.setFontSize(10)
    doc.text('Ras Desta Damitew St.,', 30, 30)
    doc.setFontSize(8)
    doc.text('Nani building 9th-12th Floor', 30, 33)
    doc.setFontSize(8)
    doc.text('Addis Ababa, Ethiopia', 30, 36)
    doc.setFontSize(15)
    doc.setFont('helvetica', 'bold')
    doc.text('Fuel Report', 80, 50) 
    generatePDF(doc) 
  }
}

const generatePDF = doc => {
  // Filter data based on initialDate and finalDate
  const filteredData =  items.value.filter(item => {
    const itemDate = new Date(item.foDate)
    const initialDateValue = new Date(initialDate.value)
    const finalDateValue = new Date(finalDate.value)

    return itemDate >= initialDateValue && itemDate <= finalDateValue
  })


  if (filteredData.length === 0) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('No data found on Specified Date', 70, 80)
    doc.save('freight-order-report.pdf')

    return
  }

  const jsonData = filteredData.map(obj => {
    const rObj = []

    rObj.push(obj.ShipmentCode)
    rObj.push(obj.foNo)
    rObj.push(obj.CustomerID.cmrName)
    rObj.push(obj.MtrId.mtrName)
    rObj.push(obj.foMtrQuantity)
    rObj.push(obj.TrpId.trpRouteName)
    rObj.push(obj.foDate)
    rObj.push(obj.foTime)
    rObj.push(obj.foRtnDate)
    rObj.push(obj.foRtnTime)

    return rObj
  })

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')

  doc.autoTable({
    headStyles: { fillColor: [15,  142, 61], minCellWidth: 12, lineWidth: 0.1,fontSize: 8, halign: 'center' },
    head: [['Shipment Code', 'FO', 'Customer', 'Material', 'Qty', 'Route', 'Date', 'Time', 'Return Date', 'Return Time']],

    body: jsonData,
    bodyStyles:{ minCellWidth: 12, lineWidth: 0.1,fontSize: 7, halign: 'center' },
    startY: 55, 
  })

  doc.save('freight-order-report.pdf')
}
</script>
