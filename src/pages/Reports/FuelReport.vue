<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted, onBeforeMount } from "vue"
import { useStore } from 'vuex'
import jsPDF from 'jspdf'
import 'jspdf-autotable' // Import the plugin


const headers = [
  { text: 'Shipment Code', value: 'FoId.ShipmentCode' },
  { text: 'Fuel Station', value: 'fuelStationID.fuelStation' },
  { text: 'Fuel Cap No', value: 'fuelCapNo' },
  { text: 'Fuel Amount', value: 'fuelAmt' },
  { text: 'Fuel Cash Birr', value: 'fuelCashBirr' },
  { text: 'Fuel Payment Type', value: 'fuelPmtType' },
  { text: 'Fuel Cap Remark', value: 'fuelCapRmk' },
]

const store = useStore()
const items = ref([])
const loading = ref(true)

onBeforeMount(async () => {
  try {
    await store.dispatch('fetchFuels')
    items.value = store.getters.fuels
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
})

const handleDownloadPDF = () => {
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
    doc.setFontSize(12)
    doc.text('Fuel Report', 80, 50)
    doc.setFont('helvetica', 'bold')
    generatePDF(doc)
  }
}

const generatePDF = doc => {
  const jsonData = items.value

  const data = jsonData.map(obj => {
    const rObj = []

    rObj.push(obj.FoId.ShipmentCode)
    rObj.push(obj.fuelStationID.fuelStation)
    rObj.push(obj.fuelCapNo)
    rObj.push(obj.fuelAmt)
    rObj.push(obj.fuelCashBirr)
    rObj.push(obj.fuelPmtType)
    rObj.push(obj.fuelCapRmk)

    return rObj
  })

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')

  doc.autoTable({
    headStyles: { fillColor: [15,  142, 61], minCellWidth: 12, lineWidth: 0.1, fontSize: 8, halign: 'center' },
    head: [['Shipment Code', 'Fuel Station', 'Fuel Cap No', 'Fuel Amount', 'Fuel Cash Birr', 'Fuel Payment Type', 'Fuel Cap Remark']],
    body: data,
    bodyStyles: { minCellWidth: 12, lineWidth: 0.1, fontSize: 7, halign: 'center' },
    startY: 55, // Adjust the starting Y position as needed to make space for the logo and text
  })

  doc.save('fuel-report.pdf')
}

const props = {
  header: "Fuel Report",
  button: {
    text: "Add Tire Status",
    to: "/tire-status/register",
  },
  buttonVisible: false,
  tableHeader: {
    headers,
    items,
  },
  handleDownloadPDF,
  placeholder: "Search via payment type",
}
</script>
