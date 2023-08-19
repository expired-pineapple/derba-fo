<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { useStore } from 'vuex'

import { useRoute } from 'vue-router'


const store = useStore()
const route = useRoute()

const id = route.params.id



onMounted(async () => {
  try {
    await store.dispatch("fetchDriverLicence", id)
  
  } catch (err) {
    console.error('Error dispatching fetchEmergencyContact action:', err)
  }
})


const licence = computed(() => store.getters.driverLicence)

const editLicence = ref(false)

const submitForm = () => {
  console.log("sub")
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
      @click="editLicence = !editLicence"
    />
  </div>
  <VCardText>
    <VForm :disabled="!editLicence">
      <VRow
        v-for="licence_local in licence"
        :key="licence_local"
      >
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="licence_local.drvLicenceNumber"
            label="Licence Number"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="licence_local.drvLicenceAuthority"
            label="Licence Authority"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="licence_local.drvLicenceIssueDate"
            label="Licence Issue Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="licence_local.drvLicenceExpiryDate"
            label="Licence Expiry Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VSwitch
            v-model="licence_local.drvLicenceActiveStatus"
            label="Passport Active Status"
          />
        </VCol>
        <!-- 👉 Form Actions -->
        <VCol
          cols="12"
          class="d-flex flex-wrap gap-4"
        >
          <VBtn
            color="primary gap-4"
            @click="submitForm"
          >
            Save Changes
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>
