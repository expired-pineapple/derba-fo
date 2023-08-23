<template>
  <VCard
    width="245"
    class="mt-3"
  >
    <VCardItem>
      <VCardTitle class="mb-4 ">
        Total Shipment
      </VCardTitle>
      <p class="text-caption">
        Completed Shipments <strong>57%</strong>
      </p>
      <VProgressLinear
        model-value="57"
        color="primary"
        rounded 
        :height="8"
        class="mb-4"
      />
      <VDivider class="mb-4" />
    </VCardItem>

    <VCardText>
      <span class="font-weight-semibold me-2 mb-4">
        Pending Shipments
      </span>
      <VProgressLinear
        model-value="32"
        color="warning"
        :height="8"
        rounded 
        class="mb-5"
      />
      <span class="font-weight-semibold me-2 mb-4">
        Inprogress Shipments
      </span>
      <VProgressLinear
        model-value="20"
        color="info"
        :height="8"
        rounded 
        class="mb-5"
      />
      <span class="font-weight-semibold me-2 mb-4">
        Cancelled Shipments
      </span>
      <VProgressLinear
        model-value="20"
        color="error"
        :height="8"
        rounded 
        class="mb-14"
      />


      <VBtn
        block
        to="/shipment"
      >
        Details
      </VBtn>
    </VCardText>
  </VCard>
</template>
