<!-- eslint-disable vue/no-restricted-class -->
<script setup>
import { useStore } from 'vuex'
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const successAlert = ref(false)
const errorAlert = ref(false)

const router = useRouter()

const trucks = ref([])
const insuranceProviders =ref([])

onBeforeMount(async () => {
  await store.dispatch('fetchTrucks')
  await store.dispatch('fetchInsuranceProviders')
  insuranceProviders.value=store.getters.insuranceProviders
  trucks.value = store.getters.trucks
})


const data = ref({
  TrkId: "",
  claimDate: "",
  insuranceProvider: "",
  claimRemark: "",
  status: "",
})



const resetForm = () => {
  data.value = {
    TrkId: "",
    claimDate: "",
    insuranceProvider: "",
    claimRemark: "",
    status: "",
  }
}


const submitForm = async() => {
  await store.dispatch("crea", data.value)

  const error = computed(() => store.getters.foError)

  if (error.value) {
    console.error('Error dispatching createComoditie action:', error.value)
    errorAlert.value = true
  } else {
    successAlert.value = true
    resetForm()
  }
  
}

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VAlert
        v-model="successAlert"
        border="start"
        variant="tonal"
        closable
        type="success"
        title="Success!"
        text="Comoditie Form saved successfully"
      />
      <VAlert
        v-model="errorAlert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        type="error"
        title="Error!"
        text="Comoditie Form not saved successfully"
      />
      <VCard title="Comoditie Form">
        <VDivider />
        <VCardText>
          <p>
            <strong>Insurance Claim Form</strong> is a form for registering new Insurance Claims.
          </p>  
        </VCardText>
        <VCardText>
          <VForm>
            <VContainer>
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="data.TrkId"
                    label="Truck"
                    :rules="[isEmptyValidator]"
                    :items="trucks"
                    item-value="id"
                    item-title="FltId.fltFleetNo"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="data.claimDate"
                    label="Claim Date"
                    :rules="[isEmptyValidator]"
                    clearable
                    outlined
                    color="primary"
                    type="date"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="data.insuranceProvider"
                    label="Insurance Provider"
                    :rules="[isEmptyValidator]"
                    :items="trucks"
                    item-value="id"
                    item-title="insuranceProvider"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="data.claimRemark"
                    label="Claim Remark"
                    :rules="[isEmptyValidator]"
                    outlined
                    color="primary"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="data.status"
                    label="Status"
                    :rules="[isEmptyValidator]"
                    :items="['Active', 'Inactive']"
                    outlined
                    color="primary"
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
            </VContainer>
          </VForm>
        </VCardText>
      </VCard>
    </vcol>
  </vrow>
</template>

