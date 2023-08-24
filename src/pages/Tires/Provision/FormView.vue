<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const tireData = {
  TrkId: null,
  NewTyerIssuNo: null,
  NewTyerDate: null,
  NewTyerKM: null,
  NewTyerBrand: null,
  NewTyerSerialNo: null,
  NewTyerRemark: null,
  NewTyerActive: false,
}

const tire = ref(structuredClone(tireData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  tire.value = structuredClone(tireData)
}

const trucks = ref([])

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchTrucks")
    trucks.value = store.getters.trucks
  } catch (err) {
    console.error('Error dispatching fetchTrucks action:', err)
  }
})

const error = store.getters.vehicleError

const submitForm = async() => {
  // Submit form data to backend
  console.log("Submitting form data:", tire.value)
  try {
    await store.dispatch("createTireProvision", tire.value)
    if(!error) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchTireProvisions")
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    console.error("Error dispatching createtireprovision action:", err)
  }
}

const items = [
  { value: true, text: 'Yes' },
  { value: false, text: 'No' },
]

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
}
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VAlert
          v-model="successAlert"
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          type="success"
          title="Success!"
          text="Tire Provision details saved successfully"
          timeout="5000"
        />
        <VAlert
          v-model="errorAlert"
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          type="error"
          title="Error!"
          text="Tire Provision details not saved successfully"
          timeout="5000"
        />
        <VCard title="Tire Provision Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new Tire Provision.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm @submit.prevent="submitForm">
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="tire.TrkId"
                    :items="trucks"
                    label="Truck"
                    item-title="FltId.fltFleetNo"
                    item-value="id"
                    placeholder="Select Truck"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="tire.NewTyerIssuNo"
                    label="Issue Number"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="tire.NewTyerDate"
                    label="Date"
                    required
                    type="date"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="tire.NewTyerKM"
                    label="KM"
                    required
                    type="number"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="tire.NewTyerBrand"
                    label="Brand"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="tire.NewTyerSerialNo"
                    label="Serial Number"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol>
                  <VSelect
                    v-model="tire.NewTyerActive"
                    :items="items"
                    item-value="value"
                    item-title="text"
                    label="Active"
                    color="primary"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="12"
                  cols="12"
                >
                  <VTextarea
                    v-model="tire.NewTyerRemark"
                    label="Remark"
                    required
                  />
                </VCol> 
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn
                    color="primary"
                    @click="submitForm"
                  >
                    Save
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
