<script lang="ts" setup>
import router from '@/router'
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const trailerCOMESAData = {
  TrlId: "",
  TrkId: "",
  trlComesaNo: "",
  trlComesaYellowNo: "",
  trlComesaIssuanceDate: "",
  trlComesaValidDate: "",
  trlComesaCountry: "",
  trlComesaActive: false,
}

const trailerCOMESADataLocal = ref(structuredClone(trailerCOMESAData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  trailerCOMESADataLocal.value = structuredClone(trailerCOMESAData)
}

const trucks = ref([])
const trailers =ref([])
const loading = ref(true)

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchTrucks")
    await store.dispatch("fetchTrailers")
    trucks.value = store.getters.trucks
    trailers.value = store.getters.trailers
  } catch (err) {
    loading.value = false
  }finally{
    loading.value = false
  }
})


const submitForm = async() => {
  try {
    await store.dispatch("createTrailerCOMESA", trailerCOMESADataLocal.value)

    const error = computed(() => store.getters.vehicleError)
    if(!error.value) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchTrailerCOMESAs")
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    errorAlert.value = true
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
        <VCard title="TrailerCOMESA Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new TrailerCOMESA.
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
                      v-model="trailerCOMESADataLocal.TrkId"
                      :items="trucks"
                      item-value="id"
                      item-title="FltId.fltFleetNo"
                      label="Truck"
                      :rules="[isEmptyValidator]"
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSelect
                      v-model="trailerCOMESADataLocal.TrlId"
                      :items="trailers"
                      item-value="id"
                      item-title="plate_number"
                      label="Trailer"
                      :rules="[isEmptyValidator]"
                      placeholder="Trailer plate number"
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerCOMESADataLocal.trlComesaNo"
                      label="COMESA Number"
                      :rules="[isEmptyValidator]"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerCOMESADataLocal.trlComesaYellowNo"
                      label="Yellow Number"
                      :rules="[isEmptyValidator]"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerCOMESADataLocal.trlComesaIssuanceDate"
                      label="Issuance Date"
                      :rules="[isEmptyValidator]"
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerCOMESADataLocal.trlComesaValidDate"
                      label="Valid Date"
                      :rules="[isEmptyValidator]"
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerCOMESADataLocal.trlComesaCountry"
                      label="Country"
                      :rules="[isEmptyValidator]"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="trailerCOMESADataLocal.trlComesaActive"
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
