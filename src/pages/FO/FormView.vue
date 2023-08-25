<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const data = {
  TrkId: "",
  TrpId: "",
  MtrId: "",
  CustomerID: "",
  foNo: "",
  foDate: "",
  foTime: "",
  foOpenKm: "",
  foRmk: "",
  foRtnDate: "",
  foRtnTime: "",
  foCloseKm: "",
  foMtrQuantity: "",
  foWbNo: "",
  foWbBill: "",
}

const trucks= ref([])
const trips= ref([])
const material= ref([])
const customer= ref([])

const dataLocal = ref(structuredClone(data))
const successAlert = ref(false)
const errorAlert = ref(false)
const loading = ref(false)

const dispatch = async () => {
  try {
    await store.dispatch("fetchTrips")
    await store.dispatch("fetchCommodities")
    await store.dispatch("fetchCustomers")
    
    trucks.value = store.getters.trucks
    trips.value = store.getters.trips
    material.value = store.getters.commodities
    customer.value = store.getters.customers
  } catch (err) {
    console.error('Error dispatching in fo form:', err)
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
  store.dispatch("createFo", dataLocal.value)


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
          FO created successfully.
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
          Error creating FO.
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
          <VCardTitle>
            <h3 class="text-h5 mb-4">
              FO Form
            </h3>
          </VCardTitle>
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new FO.
            </p>
          </VCardText>

          <VCardText>
            <VForm>
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="dataLocal.TrkId"
                    :items="trucks"
                    item-value="id"
                    item-title="FltId.fltFleetNo"
                    :loading="loading"
                    label="Truck"
                    placeholder="Select a truck"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="dataLocal.TrpId"
                    label="Route"
                    :items="trips"
                    item-value="id"
                    item-title="trpRouteName"
                    :loading="loading"
                    placeholder="Select a route"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="dataLocal.MtrId"
                    label="Material"
                    :items="material"
                    item-value="id"
                    item-title="mtrName"
                    :loading="loading"
                    placeholder="Select a material"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="dataLocal.CustomerID"
                    label="Customer"
                    :items="customer"
                    item-value="id"
                    item-title="cmrName"
                    :loading="loading"
                    placeholder="Select a Customer"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foNo"
                    label="FO No"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foDate"
                    label="FO Date"
                    outlined
                    required
                    type="date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foTime"
                    label="FO Time"
                    outlined
                    required
                    type="time"
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
                    v-model="dataLocal.foRmk"
                    label="Remark"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foRtnDate"
                    label="Return Date"
                    outlined
                    required
                    type="date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foRtnTime"
                    label="Return Time"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foCloseKm"
                    label="Close Km"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foMtrQuantity"
                    label="Meter Quantity"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foWbNo"
                    label="Wb No"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.foWbBill"
                    label="Wb Bill"
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
