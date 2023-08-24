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
    console.log(drivers.value)
    loading.value = !loading.value
  }catch(err){
    console.error('Error dispatching fetchDrivers action:', err)
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


const submitForm = () => {
  store.dispatch("createDjiboutiPass", data.value)

  const error = computed(() => store.getters.createError)

  if (error.value) {
    console.error('Error dispatching createDjiboutiPass action:', error.value)
    errorAlert.value = true
  } else {
    successAlert.value = true
    resetForm()
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="data.drvDjiboutiPActiveStatus"
                    label="Djibouti Pass Active Status"
                    required
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

