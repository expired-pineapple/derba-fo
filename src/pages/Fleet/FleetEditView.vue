<script lang="ts" setup>
import { ref, onBeforeMount } from "vue"
import { useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const fleetId = route.params.id

console.log('Fleet ID:', fleetId)

const loading = ref(true)
const expanded = ref(false)

const successAlert = ref(false)
const errorAlert = ref(false)

const fleet = ref({})
const fleets = ref([])


const dispatch = async () => {
  try {
    await store.dispatch("fetchFleets")
    await store.dispatch("fetchFleet", fleetId)
    
    fleets.value = store.getters.fleets
    fleet.value = store.getters.fleet
    console.log('Fleet:', fleet.value)
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
  console.log('Searching fleet...')

  const search = searchValue.value

  const filteredFleets = fleets.value.filter(item => {
    return item.fltFleetNo.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return fleets.value = store.getters.fleets
  }
  fleets.value = filteredFleets
  
  
}

const editFleet = async item => {
  console.log('Editing fleet:', item)
  router.push({ name: 'edit-fleet', params: { id: item.id } })
  await store.dispatch('fetchFleet', item.id)
  fleet.value = store.getters.fleet
  console.log('Fleet:', fleet.value)
}

const editSelected = item => {
  editFleet(item)
}

const submitForm = async () => {
  console.log('Submitting form...')
  try {
    await store.dispatch('updateFleet', fleet.value)
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

const deleteFleet = async item => {
  console.log('Deleting truck:', item)
  await store.dispatch('deleteFleet', item.id)
  await dispatch()
  router.push('/fleet')
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
      width="280"
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
            v-if="fleets.length > 0"
            class="wrapper scrollable"
          >
            <div
              v-for="(item, index) in fleets"
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
                      <span class="font-weight-semibold me-2 mb-4">Fleet: {{ item.fltFleetNo }}</span>
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
            <p>No Fleet Found</p>
          </div>
        </VCardText>
      </div>
    </VCard>
    <VCard
      class="d-flex gap-6"
      :width="expanded?'650':'1000'"
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
                          Delete Fleet
                        </VCardTitle>
                        <VCardText>
                          Are you sure you want to delete this fleet?
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
                            @click="deleteFleet(fleet)"
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
                        Fleet Details
                      </h3>
                      <p class="mb-2">
                        Please fill in the form below to edit selected fleet
                      </p>
                    </div>
                  </div>
                </VCardText>
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSwitch
                      v-model="fleet.fltActive"
                      label="Is Active"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                </VRow>
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltFleetNo"
                      :loading="loading"
                      label="Fleet Number"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltPlateNo"
                      :loading="loading"
                      label="Plate Number"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltCapacity"
                      :loading="loading"
                      label="Capacity(tons)"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltMake"
                      :loading="loading"
                      label="Make"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltModel"
                      :loading="loading"
                      label="Model"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltYear"
                      :loading="loading"
                      label="Year"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltTrkEngineNo"
                      label="Truck Engine Number"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltTrkChasNo"
                      label="Truck Chassis Number"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltType"
                      label="Type"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltAxleNo"
                      label="Axle Number"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltEngineType"
                      label="Engine Type"
                      required
                      outlined
                      dense
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="fleet.fltEnginePower"
                      label="Engine Power"
                      required
                      outlined
                      dense
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4 mb-4"
                  >
                    <VBtn
                      color="primary gap-4"
                      @click="submitForm"
                    >
                      Save
                    </VBtn>
                  </vcol>
                </VRow>
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
