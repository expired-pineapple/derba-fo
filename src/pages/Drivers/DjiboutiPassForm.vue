<!-- eslint-disable vue/no-restricted-class -->
<script setup>
import { useStore } from 'vuex'
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { load } from 'webfontloader'

const store = useStore()
const successAlert = ref(false)
const errorAlert = ref(false)

const router = useRouter()

const drivers = ref([])

const loading = ref(false)

onBeforeMount(async () => {
  try{
    await store.dispatch('fetchDrivers')
    drivers.value = store.getters.drivers
    loading.value = !loading.value
  }catch(err){
  }
})


const data = ref({
  DrvId: "",
  drvDjiboutiPassNo: "",
  drvDjiboutiPIssuanceDate: "",
  drvDjiboutiPExpDate: "",
  drvDjiboutiPActiveStatus: "",
})



const resetForm = () => {
  data.value = {
    DrvId: "",
    drvDjiboutiPassNo: "",
    drvDjiboutiPIssuanceDate: "",
    drvDjiboutiPExpDate: "",
    drvDjiboutiPActiveStatus: "",
  }
}


const submitForm = async() => {
  await store.dispatch("createDjiboutiPass", data.value)

  const error = store.getters.createError

  if (!error) {
    successAlert.value = true
    setTimeout(() => {
      successAlert.value = false
    }, 5000)
  } else {
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 5000)
  }
  
}

const activeItems = [{
  text: 'Active',
  value: 'true',
},
{
  text: 'Inactive',
  value: 'false',
}]

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
        text=" Form saved successfully"
      />
      <VAlert
        v-model="errorAlert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        type="error"
        title="Error!"
        text="Djibouti Pass Form not saved successfully"
      />
      <VCard title="Djibouti Form">
        <VDivider />
        <VCardText>
          <p>
            <strong>Djibouti Form</strong> is a form for registering new Djibouti.
          </p>  
        </VCardText>
        <VCardText>
          <VForm>
            <VContainer>
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="data.DrvId"
                    label="Drivers"
                    :rules="[isEmptyValidator]"
                    :items="drivers"
                    item-title="driver_name"
                    item-value="id"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.drvDjiboutiPassNo"
                    label="Djibouti Pass Number"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.drvDjiboutiPIssuanceDate"
                    label="Djibouti Pass Issuance Date"
                    type="date"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.drvDjiboutiPExpDate"
                    label="Djibouti Pass Expiry Date"
                    type="date"
                    :rules="[isEmptyValidator, hasExpired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="data.drvDjiboutiPActiveStatus"
                    label="Djibouti Pass Active Status"
                    :rules="[isEmptyValidator]"
                    :items="activeItems"
                    item-title="text"
                    item-value="value"
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

