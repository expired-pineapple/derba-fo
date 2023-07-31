<script setup>
import AnalyticsSalesByCountries from '@/views/dashboard/AnalyticsSalesByCountries.vue'
import AnalyticsTotalEarning from '@/views/dashboard/AnalyticsTotalEarning.vue'
import AnalyticsTruckBar from '@/views/dashboard/AnalyticsTruckBar.vue'
import AnalyticsUserTable from '@/views/dashboard/AnalyticsUserTable.vue'
import AnalyticsWeeklyOverview from '@/views/dashboard/AnalyticsWeeklyOverview.vue'
</script>

<template>
  <VRow class="">
    <VCol
      cols="10"
      md="3"
    >
      <AnalyticsWeeklyOverview />
    </VCol>

    <VCol
      cols="12"
      md="5"
    >
      <VCol
        cols="12"
        md="4"
      >
        <AnalyticsSalesByCountries />
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <AnalyticsTruckBar />
      </VCol>
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsTotalEarning />
    </VCol>


    <VCol cols="12">
      <AnalyticsUserTable />
    </VCol>
  </VRow>
</template>
