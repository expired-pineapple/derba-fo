<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const bolo = {
  FltId: "",
  TrkId: "",
  FltBolo_no: "",
  FltBoloissuedate: "",
  FltBoloExpireDate: "",
  FltBoloActive: false,

}

const boloLocal = ref(structuredClone(bolo))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  boloLocal.value = structuredClone(bolo)
}

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
  }
})

const error = store.getters.vehicleError


const submitForm = async() => {
  console.log("Submitting form data:", boloLocal.value)
  try {
    await store.dispatch("createFleetBolo", boloLocal)
    if(!error) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchFleetBoloes")
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    console.error("Error dispatching createbolo action:", err)
  }
}

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
}

const hasExpired = value =>{
  const date = new Date(value)
  if(date < new Date()){
    return "Document has expired"
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
          text="Bolo details saved successfully"
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
          text="Bolo details not saved successfully"
          timeout="5000"
        />
        <VCard title="Fleet Bolo Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new Bolo.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm>
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="boloLocal.TrkId"
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
                    v-model="boloLocal.FltId"
                    :items="fleets"
                    item-value="id"
                    item-title="fltPlateNo"
                    label="Fleet"
                    required
                    placeholder="Fleet plate number"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="boloLocal.FltBolo_no"
                    label="Bolo Number"
                    required
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="boloLocal.FltBoloissuedate"
                    label="Bolo Issued Date"
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
                    v-model="boloLocal.FltBoloExpireDate"
                    label="Bolo Expiry Date"
                    required
                    type="date"
                    :rules="[isEmptyValidator, hasExpired]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="boloLocal.FltBoloActive"
                    :items="[{text: 'Active', value: true}, {text: 'Inactive', value: false}]"
                    item-value="value"
                    item-title="text"
                    label="Bolo Status"
                    required
                    :rules="[isEmptyValidator]"
                  />
                </VCol>

                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click.prevent="submitForm">
                    Save
                  </VBtn>

                  <VBtn
                    color="secondary"
                    variant="tonal"
                    type="reset"
                    @click.prevent="resetForm"
                  >
                    Reset
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
