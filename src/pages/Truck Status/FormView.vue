<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
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

  }
})

const submitForm = async() => {
  try {
    await store.dispatch("createTireProvision", tire.value)

    const error = computed(() => store.getters.vehicleError) 
    if(!error.value) {
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
  }
}

const items = [
  { value: true, text: 'Yes' },
  { value: false, text: 'No' },
]
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
          text="Trailer details saved successfully"
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
          text="Trailer details not saved successfully"
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
                    required
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="tire.NewTyerIssuNo"
                    label="Issue Number"
                    required
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
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="tire.NewTyerBrand"
                    label="Brand"
                    required
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="tire.NewTyerSerialNo"
                    label="Serial Number"
                    required
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
