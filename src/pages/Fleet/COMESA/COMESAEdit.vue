<script lang="ts" setup>
import { ref, onBeforeMount } from "vue"
import { useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const id = route.params.id

console.log('Fleet ID:', id)

const loading = ref(true)
const expanded = ref(false)

const successAlert = ref(false)
const errorAlert = ref(false)

const data = ref({})
const COMESA = ref([])

const trucks = ref([])
const fleets =ref([])



const dispatch = async () => {
  try {
    await store.dispatch("fetchFleetCOMESAs")
    await store.dispatch("fetchFleetCOMESA", id)
    await store.dispatch("fetchTrucks")
    await store.dispatch("fetchFleets")
    trucks.value = store.getters.trucks
    fleets.value = store.getters.fleets
    data.value = store.getters.fleetCOMESAs
    COMESA.value = store.getters.fleetCOMESA
    console.log('COMESAs:', COMESA.value)
  } catch (err) {
    console.error('Error dispatching in truck form:', err)
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await dispatch()
})

const searchFleet = () => {
  console.log('Searching...')

  const search = searchValue.value

  const filtered = data.value.filter(item => {
    return item.FltComesaNo.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return data.value = store.getters.fleetCOMESAs
  }
  data.value = filtered
  
}

const edit = async item => {
  console.log('Editing:', item)
  await store.dispatch('fetchFleetCOMESA', item.id)
  router.push({ name: 'edit-fleet-comesa', params: { id: item.id } })
  COMESA.value = store.getters.fleetCOMESA
  console.log('fleetCOMESA:', COMESA.value)
}

const editSelected = item => {
  edit(item)
}

const submitForm = async () => {
  console.log('Submitting form...')
  try {
    await store.dispatch('updateFleetCOMESA', COMESA.value)
    successAlert.value = true
    setTimeout(() => {
      successAlert.value = false
    }, 3000)
    await dispatch()
  } catch (err) {
    console.error('Error submitting form:', err)
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 3000)
  }
  await dispatch()
}

const deleteItem = async item => {
  console.log('Deleting:', item)
  await store.dispatch('deleteFleetCOMESA', item.id)
  await dispatch()
  router.push('/fleet-comesa')
}

const disabled = ref(true)
const dialog = ref(false)

const editEnabled = () => {
  disabled.value = false
}
</script>

<template>
  <div class="d-flex">
    <VCard
      v-if="expanded"
      class="mr-4"
      width="35%"
    >
      <div class="searchable">
        <VCardText> 
          <div class="d-flex">
            <VTextField
              v-model="searchValue"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              variant="underlined"
              class="mb-4"
              @input="searchFleet"
            />
          </div>
          <div
            v-if="loading"
            class="preloader"
          >
            <div
              v-for="(item, index) in 6"
              :key="index"
            >
              <div class="header" />
              <div class="sub" />
            </div>
          </div>
          <div
            v-if="data.length > 0"
            class="wrapper scrollable"
          >
            <div
              v-for="(item, index) in data"
              :key="index"
            >
              <div class="d-flex mt-4">
                <VIcon
                  icon="mdi-truck-outline" 
                  size="30"
                  class="mr-2"
                  color="primary"
                />  
                <div>
                  <div class="d-flex">
                    <div class="info">
                      <span class="font-weight-semibold me-2 mb-4">COMESA: {{ item.FltComesaNo }}</span>
                    </div>
                    <div class="icon">
                      <VBtn
                        icon="mdi-pencil"
                        size="x-small"
                        variant="tonal"
                        @click="editSelected(item)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <VDivider />
            </div>
          </div>
          <div
            v-else
            class="else"
          >
            <p>No Fleet COMESA Found</p>
          </div>
        </VCardText>
      </div>
    </VCard>

    <VCard
      class="d-flex gap-6"
      width="100%"
    >
      <div class="">
        <VCardText>
          <VRow width="20%">
            <VCol cols="12">
              <VAlert
                v-model="successAlert"
                border="start"
                variant="tonal"
                closable
                close-label="Close Alert"
                type="success"
                title="Success!"
                text="Fleet details saved successfully"
              />
              <VAlert
                v-model="errorAlert"
                border="start"
                variant="tonal"
                closable
                close-label="Close Alert"
                type="error"
                title="Error!"
                text="Fleet details not saved successfully"
              />
              <!-- 👉 Form -->
              <VCardText>
                <div class="icons d-flex justify-end">
                  <VIcon
                    size="24"
                    icon="mdi-pencil-outline"
                    class="me-6"
                    @click="editEnabled"
                  />
                  <VDialog
                    v-model="dialog"
                    persistent
                    width="auto"
                  >
                    <template #activator="{ props }">
                      <VIcon
                        size="24"
                        icon="mdi-delete-outline"
                        class="me-6"
                        v-bind="props"
                        color="error"
                      />
                    </template>
                    <VCard>
                      <VCardTitle class="headline">
                        Delete COMESA
                      </VCardTitle>
                      <VCardText>
                        Are you sure you want to delete this COMESA?
                      </VCardText>
                      <VCardActions>
                        <VSpacer />
                        <VBtn
                          color="green-darken-1"
                          variant="text"
                          @click="dialog = false"
                        >
                          No
                        </VBtn>
                        <VBtn
                          color="error"
                          variant="text"
                          @click="deleteItem(COMESA)"
                        >
                          Yes
                        </VBtn>
                      </VCardActions>
                    </VCard>
                  </VDialog>
                </div>
                <div class="d-flex">
                  <VIcon
                    size="70"
                    icon="mdi-truck-outline"
                    class="me-6"  
                  />
                  <div>
                    <h3 class="font-weight-semibold mb-2">
                      Fleet COMESA Details
                    </h3>
                    <p class="mb-2">
                      Please fill in the form below to edit selected fleet COMESA
                    </p>
                  </div>
                </div>
              </VCardText>
              <VForm @submit.prevent="submitForm">
                <VContainer>
                  <VRow>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VSelect
                        v-model="COMESA.TrkId"
                        :items="trucks"
                        :loading="loading"
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
                        v-model="COMESA.FltId"
                        :items="fleets"
                        item-value="id"
                        item-title="fltPlateNo"
                        label="Fleet"
                        :loading="loading"
                        required
                        persistent-hint="Fleet plate number"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="COMESA.FltComesaNo"
                        label="COMESA Number"
                        required
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="COMESA.FltComesaYellowNo"
                        label="Yellow Number"
                        required
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="COMESA.FltComesaIssuanceDate"
                        label="Issuance Date"
                        required
                        type="date"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="COMESA.FltComesaExpireDate"
                        label="Expiry Date"
                        required
                        type="date"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="COMESA.FltComesaCountry"
                        label="Country"
                        required
                      />
                    </VCol>
                    <VCol cols="12">
                      <VSwitch
                        v-model="COMESA.FltComesaActive"
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
                    </VCol>
                  </VRow>
                </VContainer>
              </VForm>
            </VCol>
          </VRow>
        </VCardText> 
      </div> 
    
      <div class="justify-end mt-4">
        <VIcon 
          color="primary"
          :icon="expanded ? 'mdi-arrow-expand' :'mdi-arrow-collapse'"
          @click="expanded=!expanded"
        />
      </div>     
    </VCard>
  </div>
</template>

<style scoped>
.search {
  border-radius: 4px;
  border-block-end: 1px solid #e0e0e0;
  font-size: 14px;
  inline-size: 100%;
  margin-block-start: 10px;
}

.search:focus {
  outline: none;
}

.scrollable {
  block-size: 400px;
  inline-size: 250px;
  overflow-y: scroll;
  padding-inline-end: 15px;
}

.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  block-size: 70px;
}

.preloader .header {
  background-color: #e0e0e0;
  block-size: 6%;
  inline-size: 65%;
}

.preloader .sub {
  background-color: #e0e0e0;
  block-size: 6%;
  inline-size: 60%;
  margin-block-start: 5px;
}

@keyframes loading {
  0% {
    opacity: 0.2;
  }

  20% {
    opacity: 0.4;
  }

  40% {
    opacity: 0.6;
  }

  60% {
    opacity: 0.8;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
