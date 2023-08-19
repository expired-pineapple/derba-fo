<script lang="ts" setup>
import { ref, onBeforeMount, computed } from "vue"
import { useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const id = route.params.id

console.log('ID:', id)

const loading = ref(true)
const expanded = ref(false)

const successAlert = ref(false)
const errorAlert = ref(false)

const data = ref({})
const insurance = ref([])
const trucks = ref([])
const fleets =ref([])

const dispatch = async () => {
  try {
    await store.dispatch("fetchFleetThirdParties")
    await store.dispatch("fetchFleetThirdParty", id)
    await store.dispatch("fetchTrucks")
    await store.dispatch("fetchFleets")
    trucks.value = store.getters.trucks
    fleets.value = store.getters.fleets
    
    data.value = store.getters.fleetThirdParties
    insurance.value = store.getters.fleetThirdParty
    console.log('insurance:', insurance.value)
  } catch (err) {
    console.error('Error dispatching in truck form:', err)
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await dispatch()
})

const search = () => {
  console.log('Searching...')

  const search = searchValue.value

  const filteredInsurances = data.value.filter(item => {
    return item.FltThirdInsNo.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return data.value = store.getters.fleetThirdParties
  }
  data.value = filteredInsurances
  
  
}

const edit = async item => {
  console.log('Editing:', item)
  router.push({ name: 'edit-fleet-third-party', params: { id: item.id } })
  await store.dispatch('fetchFleetThirdParty', item.id)
  insurance.value = store.getters.fleetThirdParty
  console.log('Insurance:', insurance.value)
}

const editSelected = item => {
  edit(item)
}

const error = computed(() => store.getters.vehicleError)

const submitForm = async () => {
  console.log('Submitting form...')
  try {
    await store.dispatch('updateFleetThirdParty', insurance.value)
    await dispatch()
    if(!error.value){
      successAlert.value = true
      setTimeout(() => {
        successAlert.value = false
      }, 3000)
    }else{
      errorAlert.value = true
      setTimeout(() => {
        errorAlert.value = false
      }, 3000)
    }
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
  console.log('Deleting truck:', item)
  await store.dispatch('deleteFleetThirdParty', item.id)
  await dispatch()
  router.push('/fleet-third-party')
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
              @input="search"
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
                      <span class="font-weight-semibold me-2 mb-4">Third Party: {{ item.FltThirdInsNo }}</span>
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
            <p>No Third Party Found</p>
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
                text="Insurance details saved successfully"
              />
              <VAlert
                v-model="errorAlert"
                border="start"
                variant="tonal"
                closable
                close-label="Close Alert"
                type="error"
                title="Error!"
                text="Insurance details not saved successfully"
              />
              <!-- 👉 Form -->
              <VForm
                class="mt-10"
                :disabled="disabled"
                :loading="loading"
                @submit.prevent="submitForm"
              >
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
                          Delete Insurance
                        </VCardTitle>
                        <VCardText>
                          Are you sure you want to delete this Insurance?
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
                            @click="deleteItem(insurance)"
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
                        Fleet Third Party Details
                      </h3>
                      <p class="mb-2">
                        Please fill in the form below to edit selected third party
                      </p>
                    </div>
                  </div>
                </VCardText>
                <VCardText>
                  <VForm @submit.prevent="submitForm">
                    <VContainer>
                      <VRow>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VSelect
                            v-model="insurance.TrkId"
                            :items="trucks"
                            item-value="id"
                            item-title="FltId.fltFleetNo"
                            label="Truck"
                            required
                            :loading="loading"
                          />
                        </VCol>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VSelect
                            v-model="insurance.FltId"
                            :items="fleets"
                            item-value="id"
                            item-title="fltPlateNo"
                            label="Fleet Plate Number"
                            required
                            persistent-hint="Fleet plate number"
                            :loading="loading"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="insurance.FltThirdInsNo"
                            label="Insurance Number"
                            required
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="insurance.FltThirdIssuanceDate"
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
                            v-model="insurance.FltThirdValidationDate"
                            label="Valid Date"
                            required
                            type="date"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="insurance.FltThirdPolicyNo"
                            label="Insurance Policy Number"
                            required
                          />
                        </VCol>
                        <VCol cols="12">
                          <VSwitch
                            v-model="insurance.FltThirdActive"
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
                </VCardText>
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
