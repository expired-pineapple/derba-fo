<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const data = {
  FoId: null,
  prdDate: null,
  prdNoDays: null,
  prdIsTaxable: "No",
  prdPmtPerDay: null,
  prdTaxblAmt: null,
  prdDeduct: null,
  prdNetPmt: null,
  prdRemark: null,
}

const route = useRoute()
const dataLocal = ref({})

const successAlert = ref(false)
const errorAlert = ref(false)
const loading = ref(true)
const formLoading = ref(false)

const fos = ref([])
const fo = ref({})
const perdieum = ref({})
const edit = ref(false)

const store = useStore()

const dispatch = async () => {
  try {
    await store.dispatch("fetchFo", route.params.id)
    await store.dispatch("fetchFos")
    await store.dispatch("fetchPerdiuems", route.params.id)
    
    fo.value = store.getters.fo
    fos.value = store.getters.fos
    console.log('fos:', fos.value)

    perdieum.value = store.getters.perdiuem
    console.log('perdieum:', perdieum.value)
    if (perdieum.value != null && perdieum.value.length > 0) {
      dataLocal.value = { ...perdieum.value[0] }
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

const taxableAmount = computed(() => {
  dataLocal.value.prdTaxblAmt = dataLocal.value.prdPmtPerDay * dataLocal.value.prdNoDays
  if (dataLocal.value.prdIsTaxable == "Yes") {
    dataLocal.value.prdDeduct = dataLocal.value.prdTaxblAmt * 0.15
    dataLocal.value.prdNetPmt = dataLocal.value.prdTaxblAmt - dataLocal.value.prdDeduct
  } else {
    dataLocal.value.prdDeduct = 0
    dataLocal.value.prdNetPmt = dataLocal.value.prdTaxblAmt
  }

  return dataLocal.value.prdTaxblAmt
})

const resetForm = () => {
  dataLocal.value = { ...data }
}

const submitForm = () => {
  dataLocal.value.FoId = route.params.id
  if (edit.value) {
    store.dispatch("updatePerdiuem", dataLocal.value)
  } else {
    store.dispatch("createPerdiuem", dataLocal.value)
  }

  console.log("Submitting form data:", dataLocal.value)

  const error = computed(() => store.getters.foError)
  if (error.value) {
    console.error('Error dispatching createPerdiuem action:', error.value)
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

const items = [
  {
    text: "Yes",
    value: "Yes",
  },
  {
    text: "No",
    value: "No",
  },
]
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
          Perdieum created successfully.
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
          Error creating Perdieum.
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
                Perdieum Form
              </VCardTitle>
              <VCardSubtitle>
                Fill the form below to register a new Perdieum.
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
          <VDivider class="mb-4 mt-4" />

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
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="dataLocal.prdDate"
                    label="Date"
                    type="date"
                    outlined
                    dense
                    required
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="dataLocal.prdNoDays"
                    label="No. of Days"
                    type="number"
                    outlined
                    dense
                    required
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="dataLocal.prdIsTaxable"
                    :items="items"
                    item-value="value"
                    item-title="text"
                    label="Is Taxable"
                    outlined
                    dense
                    required
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="dataLocal.prdPmtPerDay"
                    label="Payment Per Day"
                    type="number"
                    outlined
                    dense
                    required
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="taxableAmount"
                    label="Taxable Amount"
                    type="number"
                    outlined
                    dense
                    required
                    readonly
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="dataLocal.prdDeduct"
                    label="Deduction"
                    type="number"
                    outlined
                    dense
                    required
                    readonly
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="dataLocal.prdNetPmt"
                    label="Net Payment"
                    type="number"
                    outlined
                    dense
                    required
                    readonly
                  /> 
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="dataLocal.prdRemark"
                    label="Remark"
                    outlined
                    dense
                    required
                  />
                </VCol>
              </VRow>
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  :loading="formLoading"
                  @click.prevent="submitForm"
                >
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
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
