<script lang="ts" setup>
import router from '@/router'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const COMESAData = {
  FltId: "",
  TrkId: "",
  FltComesaNo: "",
  FltComesaYellowNo: "",
  FltComesaIssuanceDate: "",
  FltComesaExpireDate: "",
  FltComesaCountry: "",
  FltComesaActive: false,
}

const COMESADataLocal = ref(structuredClone(COMESAData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  COMESADataLocal.value = structuredClone(COMESAData)
}


const loading = ref(true)
const trucks = ref([])
const fleets =ref([])


onBeforeMount(async () => {
  try {
    await store.dispatch("fetchTrucks")
    await store.dispatch("fetchFleets")
    trucks.value = store.getters.trucks
    fleets.value = store.getters.fleets
  } catch (err) {
    console.error("Error dispatching fetch action:", err)
  }finally{
    loading.value=false
  }
})


const error = store.getters.vehicleError

const submitForm = () => {
  // Submit form data to backend
  console.log("Submitting form data:", COMESADataLocal.value)
  try {
    store.dispatch("createFleetCOMESA", COMESADataLocal.value)
    if(!error) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchFleetCOMESAs")
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    console.error("Error dispatching createFleetCOMESA action:", err)
  }
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
          text=" details saved successfully"
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
          text=" details not saved successfully"
          timeout="5000"
        />
        <VCard title="COMESA Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new COMESA.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm @submit.prevent="submitForm">
              <VContainer>
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSelect
                      v-model="COMESADataLocal.TrkId"
                      :items="trucks"
                      item-value="id"
                      item-title="FltId.fltFleetNo"
                      label="Truck"
                      required
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSelect
                      v-model="COMESADataLocal.FltId"
                      :items="fleets"
                      item-value="id"
                      item-title="fltPlateNo"
                      label="Fleet"
                      required
                      persistent-hint="Fleet plate number"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="COMESADataLocal.FltComesaNo"
                      label="COMESA Number"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="COMESADataLocal.FltComesaYellowNo"
                      label="Yellow Number"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="COMESADataLocal.FltComesaIssuanceDate"
                      label="Issuance Date"
                      required
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="COMESADataLocal.FltComesaExpireDate"
                      label="Expiry Date"
                      required
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="COMESADataLocal.FltComesaCountry"
                      label="Country"
                      required
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="COMESADataLocal.FltComesaActive"
                      label="Active"
                    />
                  </VCol>
                </VRow>
                <VRow>
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
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      type="reset"
                    >
                      Reset
                    </VBtn>
                  </VCol>
                </VRow>
              </VContainer>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
