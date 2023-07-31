<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const currentTheme = controlledComputed(() => vuetifyTheme.name.value, () => vuetifyTheme.current.value.colors)
const variableTheme = controlledComputed(() => vuetifyTheme.name.value, () => vuetifyTheme.current.value.variables)

const series = [{
  name: "Trucks",
  data: [31, 40, 28, 51, 42, 109, 100],
}]

const chartOptions = {
  series: [{
    data: [400, 430, 448, 470, 540, 580, 690],
  }],
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  colors: [currentTheme.value.primary],
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'FSR',
      'Flatbed',
      'Highbed',
      'Lowbed',
      'Shelto',
      'Dump Truck',
      'NPR',
    ],
  },
}
</script>

<template>
  <VCard
    width="400"
    height="220"
  >
    <VCardText>
      <VueApexCharts
        type="bar"
        :options="chartOptions"
        :series="series"
        :height="180"
      />

      <p class="text-center font-weight-medium mb-0">
        Shipment Status
      </p>
    </VCardText>
  </VCard>
</template>
