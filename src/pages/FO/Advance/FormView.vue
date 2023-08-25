<script setup>
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const data = {
  FoId: null,
  advDate: null,
  advParking: null,
  advDjiboEnter: null,
  advLoadUnload: null,
  advTyerRepair: null,
  advCarWash: null,
  advFuelOnCash: null,
  advOther: null,
  advTotalAdv: null,
  advRemark: null,
}

const route = useRoute()
const dataLocal = ref(structuredClone(data))

dataLocal.value.FoId = route.params.id

const successAlert = ref(false)
const errorAlert = ref(false)
const loading = ref(false)

const fos = ref([])
const advance = ref({})
const edit = ref(false)

const dispatch = async () => {
  try {
    await store.dispatch("fetchFos", route.params.id)
    await store.dispatch("fetchAdvances", route.params.id)

    advance.value = store.getters.advance
    fos.value = store.getters.fo

    if (advance.value !== null && advance.value.length > 0) {
      edit.value = true
      dataLocal.value = { ...advance.value[0] }
    }


  } catch (err) {
    console.error('Error dispatching in advance form:', err)
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

const totalAdvance = computed(() => {
  const total = Number(dataLocal.value.advParking) + Number(dataLocal.value.advDjiboEnter) + Number(dataLocal.value.advLoadUnload) + Number(dataLocal.value.advTyerRepair) + Number(dataLocal.value.advCarWash) + Number(dataLocal.value.advFuelOnCash) + Number(dataLocal.value.advOther)
  
  dataLocal.value.advTotalAdv = total
  
  return total
})

const resetForm = () => {
  dataLocal.value = structuredClone(data)
}

const store = useStore()

const submitForm = () => {
  if (edit.value) {
    store.dispatch("updateAdvance", dataLocal.value)
  }else{
    store.dispatch("createAdvance", dataLocal.value)
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
          Advance created successfully.
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
          Error creating Advance.
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
                Advance Form
              </VCardTitle>
              <VCardSubtitle>
                Fill the form below to register a new Advance.
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
                  <VTextField
                    v-model="dataLocal.advDate"
                    label="Advance Date"
                    placeholder="Advance Date"
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
                    v-model="dataLocal.advParking"
                    label="Parking"
                    placeholder="Parking Fee"
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
                    v-model="dataLocal.advDjiboEnter"
                    label="Djibouti Entrance Fee"
                    placeholder="Djibouti Entrance Fee"
                    outlined
                    type="number"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.advLoadUnload"
                    label="Load/Unload"
                    placeholder="Load/Unload"
                    outlined
                    type="number"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.advTyerRepair"
                    label="Tyer Repair"
                    outlined
                    required
                    placeholder="Tyer Repair"
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="dataLocal.advCarWash"
                    label="Car Wash"
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
                    v-model="dataLocal.advFuelOnCash"
                    label="Fuel On Cash"
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
                    v-model="dataLocal.advOther"
                    label="Other"
                    outlined
                    required
                    type="number"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextField
                    v-model="totalAdvance"
                    label="Total Advance"
                    outlined
                    readonly
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextarea
                    v-model="dataLocal.advRemark"
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
