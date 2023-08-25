<script setup>
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const data = {
  FoId: "",
  advID: "",
  stlmDjiboEnter: "",
  stlmDjiboParking: "",
  stlmLoadUnload: "",
  stlmLocalParking: "",
  stlmTyerRepair: "",
  stlmCarWash: "",
  stlmFuelOnCash: "",
  stlmInnerTube: "",
  stlmOther: "",
  stlmTotalWorkFund: "",
  stlmTotalAdvancePaid: "",
  stlmFinalFundToDriver: "",
  stlmFinalFundToCompany: "",
  stlmWorkFundRemark: "",
  stlmOtherExpenseRemark: "",
  
}

const route = useRoute()
const dataLocal = ref({})

const successAlert = ref(false)
const errorAlert = ref(false)
const loading = ref(false)
const advance = ref({})
const settlement = ref({})
const edit = ref(false)

const fos = ref([])
const fo = ref({})

const dispatch = async () => {
  try {
    await store.dispatch("fetchFo", route.params.id)
    await store.dispatch("fetchFos")
    await store.dispatch("fetchAdvances", route.params.id)
    await store.dispatch("fetchSettlements", route.params.id)

    advance.value = store.getters.advance[0]
    dataLocal.value.advID = advance.value.id
    dataLocal.value.stlmTotalAdvancePaid = advance.value.advTotalAdv
    fos.value = store.getters.fos
    fo.value = store.getters.fo
    settlement.value = store.getters.settlement[0]

    if (settlement.value != null ) {

      dataLocal.value = { ...settlement.value }
      edit.value = true
    } else {
      dataLocal.value.FoId = route.params.id
      dataLocal.value = { ...data }
    }

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
  dataLocal.value.FoId = route.params.id
  if (edit.value) {
    store.dispatch("updateSettlement", dataLocal.value)
  } else{
    store.dispatch("createSettlement", dataLocal.value)
  }

  const error = computed(() => store.getters.foError)
  if (error.value) {
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

const totalWorkingFund = computed(() => {
  const total = Number(dataLocal.value.stlmDjiboEnter) + Number(dataLocal.value.stlmDjiboParking) + Number(dataLocal.value.stlmLoadUnload) + Number(dataLocal.value.stlmLocalParking) + Number(dataLocal.value.stlmTyerRepair) + Number(dataLocal.value.stlmCarWash) + Number(dataLocal.value.stlmFuelOnCash) + Number(dataLocal.value.stlmInnerTube) + Number(dataLocal.value.stlmOther)

  dataLocal.value.stlmTotalWorkFund = total
  
  return total
})

const finalFundToDriver = computed(() => {
  const total = Number(dataLocal.value.stlmTotalWorkFund) - Number(dataLocal.value.stlmTotalAdvancePaid)
  if (total < 0) {
    dataLocal.value.stlmFinalFundToDriver = 0

    return 0
  }else{
    dataLocal.value.stlmFinalFundToDriver = total

    return total}
})

const finalFundToCompany = computed(() => {
  const total = Number(dataLocal.value.stlmTotalAdvancePaid) - Number(dataLocal.value.stlmTotalWorkFund)

  if(total < 0){
    dataLocal.value.stlmFinalFundToCompany = 0

    return 0
  }else{
    dataLocal.value.stlmFinalFundToCompany = total

    return total}
})

const error = computed(() => store.getters.foError)
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
          Settlement created successfully.
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
          Error creating Settlement.
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
                Settlement Form
              </VCardTitle>
              <VCardSubtitle>
                Fill the form below to register a new Settlement.
              </VCardSubtitle>
            </div>
            <div class="d-flex mr-4 mt-4">
              <VIcon 
                color="primary"
                icon="mdi-close"
                @click="() => $router.go(-1)"
              />
            </div> 
          </div>
          <VDivider class="my-4" />
          <VCardText>
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
                  <VTextField
                    v-model="dataLocal.stlmDjiboEnter"
                    label="Djibouti Entrance"
                    placeholder="Djibouti Entrance Fee"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmDjiboParking"
                    label="Djibouti Parking"
                    outlined
                    required
                    placeholder="Djibouti Parking Fee"
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmLoadUnload"
                    label="Load/Unload"
                    placeholder="Load/Unload Fee"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmLocalParking"
                    label="Local Parking"
                    placeholder="Local Parking Fee"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmTyerRepair"
                    label="Tyer Repair"
                    placeholder="Tyer Repair Fee"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmCarWash"
                    label="Car Wash"
                    placeholder="Car Wash Fee"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmFuelOnCash"
                    label="Fuel on Cash"
                    placeholder="Fuel on Cash Fee"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmInnerTube"
                    label="Inner Tube"
                    placeholder="Inner Tube Fee"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmOther"
                    label="Other"
                    placeholder="Other Fee"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="totalWorkingFund"
                    label="Total Work Fund"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmTotalAdvancePaid"
                    label="Total Advance Paid"
                    outlined
                    required
                    readonly
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="finalFundToDriver"
                    label="Working Fund To Be Paid"
                    outlined
                    required
                    readonly
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="finalFundToCompany"
                    label="Amount Due DMC"
                    outlined
                    required
                    readonly
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmWorkFundRemark"
                    label="Work Fund Remark"
                    outlined
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.stlmOtherExpenseRemark"
                    label="Other Expense Remark"
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
