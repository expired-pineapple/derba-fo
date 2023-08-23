<template>
  <VCard
    width="260"
    class="mx-auto"
  >
    <VCardItem>
      <VCardTitle class="mb-4 ">
        Trucks Overview
      </VCardTitle>
      <p class="text-caption">
        Total Trucks <strong>20</strong>
      </p>
      <VDivider class="" />
    </VCardItem>
    <VCardText>
      <div class="d-flex mb-2">
        <VAvatar
          color="primary"
          variant="tonal"
          border
          size="64"
        >
          <VIcon
            class="text-h4"
            color="primary"
          >
            mdi-truck-outline
          </VIcon>
        </VAvatar>
        <div class="mx-auto my-2">
          <h3 class="text-h5 text-primary">
            12
          </h3>
          <p class="mb-4">
            Serviced Trucks
          </p>
        </div>
      </div>
      <div class="d-flex">
        <VAvatar
          color="warning"
          variant="tonal"
          border
          size="64"
        >
          <VIcon
            class="text-h4"
            color="warning"
          >
            mdi-truck-outline
          </VIcon>
        </VAvatar>
        <div class="mx-auto my-2">
          <h3 class="text-h5 text-warning">
            5
          </h3>
          <p class="mb-4">
            Need Service
          </p>
        </div>
      </div>
      <div class="d-flex">
        <VAvatar
          color="error"
          variant="tonal"
          border
          size="64"
        >
          <VIcon
            class="text-h4"
            color="error"
          >
            mdi-truck-outline
          </VIcon>
        </VAvatar>
        <div class="mx-auto my-2">
          <h3 class="text-h5 text-error">
            3
          </h3>
          <p class="mb-4">
            Out of Service
          </p>
        </div>
      </div>
      <VBtn
        block
        to="/trucks"
      >
        Details
      </VBtn>
    </vcardtext>
  </VCard>
</template>

<script>
export default {

}
</script>
