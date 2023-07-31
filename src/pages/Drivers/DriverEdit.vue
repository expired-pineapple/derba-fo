
<script>
import router from "@/router"
</script>

<template>
  <VCard>
    <VCardItem>
      <div class="d-flex">
        <VAvatar class="mr-4">
          <VIcon
            size="200"
            color="primary"
          >
            mdi-account-outline
          </VIcon>
        </VAvatar>
        <div class="driver-info">
          <p class="mb-0">
            <strong>Driver Name:</strong>
            John Doe
          </p>
          <p>
            <strong>Driver DMC ID:</strong>
            123456789
          </p>
        </div>  
      </div>
    </VCardItem>
    <VDivider
      color="primary"
      class="mb-4"
    />
  </VCard>
</template>

