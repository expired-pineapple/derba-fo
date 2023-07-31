<script setup>
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const currentTheme = controlledComputed(() => vuetifyTheme.name.value, () => vuetifyTheme.current.value.colors)
const variableTheme = controlledComputed(() => vuetifyTheme.name.value, () => vuetifyTheme.current.value.variables)

const series = [{
  name: 'Completed Shipments',
  data: [31, 40, 28, 51, 42, 109, 100],

},
{
  name: 'Cancelled Shipments',
  data: [41, 32, 45, 32, 34, 52, 41],
}]

const chartOptions = controlledComputed(() => vuetifyTheme.name.value, () => {
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    tooltip: { enabled: false },
    grid: {
      borderColor: `rgba(${ hexToRgb(String(variableTheme.value['border-color'])) },${ variableTheme.value['border-opacity'] })`,
      strokeDashArray: 6,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: {
        top: -10,
        left: -7,
        right: 5,
        bottom: 10,
      },
    },
    stroke: {
      width: 3,
      lineCap: 'butt',
      curve: 'straight',
    },
    colors: [currentTheme.value.primary, currentTheme.value.error],
    markers: {
      size: 6,
      offsetY: 4,
      offsetX: -2,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [{
        size: 5.5,
        seriesIndex: 0,
        strokeColor: currentTheme.value.primary,
        fillColor: currentTheme.value.surface,
        dataPointIndex: series[0].data.length - 1,
      }],
      hover: { size: 7 },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
  }
})
</script>

<template>
  <VCard
    width="400"
    height="180"
  >
    <VCardText>
      <VueApexCharts
        type="line"
        :options="chartOptions"
        :series="series"
        :height="150"
        class="mb-4"
      />

      <p class="text-center font-weight-medium mb-0">
        Shipment Status
      </p>
    </VCardText>
  </VCard>
</template>
