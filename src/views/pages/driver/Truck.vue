<script lang="ts" setup>
import { ref } from "vue"

const truck = {
  "fleet_number": "ET-101",
  "fltPlateNo": "6-4578-19",
  "plate_number": "3-4567-89",
  "trailer_model": "Sinotruck",
  "trailer_type": "Flatbed",
  "trkActive": true,
}

const truckLocal = ref(structuredClone(truck))

const editTruck = ref(false)

const submitForm = () => {
  console.log(truckLocal.value)
}
</script>

<template>
  <div
    class="d-flex gap-4"
    style="justify-content: flex-end;"
  >
    <VIcon
      class="cursor-pointer"
      color="primary"
      size="24"
      start
      icon="mdi-pencil-outline"
      @click="editdriverLeave = !editdriverLeave"
    />
  </div>
  <VCardText>
    <VForm
      :disabled="!editTruck"
      @submit.prevent="submitForm"
    >
      <VContainer>
        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              v-model="truckLocal.fleet_number"
              label="Fleet Number"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              v-model="truckLocal.plate_number"
              label="Plate Number"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              v-model="truckLocal.trailer_model"
              label="Trailer Model"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              v-model="truckLocal.trailer_type"
              label="Trailer Type"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              v-model="truckLocal.fltPlateNo"
              label="Fleet Plate Number"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              v-model="truckLocal.trkActive"
              label="Truck Active Status"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VBtn
              type="submit"
              color="primary"
            >
              Save Changes
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </VForm>
  </VCardText>
</template>

