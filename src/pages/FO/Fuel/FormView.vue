<script setup>
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const data = {
  FoId: "",
  fuelStationID: "",
  fuelPmtType: "",
  fuelCapNo: "",
  fuelAmt: "",
  fuelCashBirr: "",
  fuelCapRmk: "",
}

const route = useRoute()
const dataLocal = ref(structuredClone(data))

dataLocal.value.FoId = route.params.id

const successAlert = ref(false)
const errorAlert = ref(false)
const loading = ref(true)

const fos = ref([])
const fo = ref({})
const fuelStations = ref([])


const dispatch = async () => {
  try {
    await store.dispatch("fetchFo", route.params.id)
    await store.dispatch("fetchFos")
    await store.dispatch("fetchFuelStations")

    fuelStations.value = store.getters.fuelStations
    fo.value = store.getters.fo
    fos.value = store.getters.fos
    console.log('foooooo:', fo.value)

  } catch (err) {
    console.error('Error dispatching in fuel form:', err)
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  try {
    await dispatch()
  } catch (err) {
    console.error('Error dispatching action:', err)
  }
})


const resetForm = () => {
  dataLocal.value = structuredClone(data)
}

const store = useStore()

const submitForm = () => {
  dataLocal.FoId=route.params.id
  store.dispatch("createFuel", dataLocal.value)

  console.log("Submitting form data:", dataLocal.value)

  const error = computed(() => store.getters.foError)
  if (error.value) {
    console.error('Error dispatching createFo action:', error.value)
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 5000)
  } else {
    successAlert.value = true
    setTimeout(() => {
      successAlert.value = false
    }, 5000)
    resetForm()

    store.dispatch("fetchFos")
  }
  
}
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <VAlert
          v-if="successAlert"
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          type="success"
          title="Success!"
        >
          Fuel created successfully.
        </VAlert>
        <VAlert
          v-if="errorAlert"
          v-model="errorAlert"
          border="start"
          variant="tonal"
          closable
          type="error"
          close-label="Close Alert"
        >
          Error creating Fuel.
          <VCardText>
            <ul>
              <li
                v-for="err in error"
                :key="err"
              >
                {{ err }}
              </li>
            </ul>
          </VCardText>
        </VAlert>
        <VCard>
          <div class="d-flex justify-space-between">
            <div class="mr-2 mt-4  mb-2">
              <VCardTitle>
                Fuel Form
              </VCardTitle>
              <VCardSubtitle>
                Fill the form below to register a new fuel.
              </VCardSubtitle>
            </div>
            <div class="d-flex mr-2 mt-2">
              <VIcon 
                color="primary"
                icon="mdi-close"
                @click="() => $router.go(-1)"
              />
            </div> 
          </div>
          <VDivider />
          <VCardText class="d-flex flex-wrap gap-4 mt-4">
            <VForm>
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="fo"
                    label="Freight Order"
                    item-title="ShipmentCode"
                    :items="fos"
                    item-value="id"
                    :loading="loading"
                    readonly
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="dataLocal.fuelStationID"
                    placeholder="Fuel Station"
                    label="Fuel Station"
                    :items="fuelStations"
                    item-value="id"
                    item-title="fuelStation"
                    :loading="loading"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.fuelPmtType"
                    label="Fuel Permit Type"
                    placeholder="Fuel Permit Type"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.fuelCapNo"
                    label="Fuel Coupon Number"
                    placeholder="Fuel Coupon Number"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.fuelAmt"
                    label="Fuel Amount(L)"
                    outlined
                    required
                    type="number"
                    placeholder="Fuel Amount in Liters"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.fuelCashBirr"
                    label="Fuel Cash Birr"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foOpenKm"
                    label="Open Km"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.fuelCapRmk"
                    label="Remark"
                    outlined
                    required
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
