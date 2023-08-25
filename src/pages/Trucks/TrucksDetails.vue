<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeMount } from "vue"
import { mapActions, useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const truckId = route.params.id

const loading = ref(true)

const successAlert = ref(false)
const errorAlert = ref(false)

const truck = ref({})
const trailers = ref([])
const drivers = ref([])
const fleets = ref([])
const trucks = ref([])

const dispatch = async () => {
  try {
    await store.dispatch('fetchTrucks')
    await store.dispatch('fetchTruckOnly', route.params.id)
    await store.dispatch('fetchDrivers')
    await store.dispatch('fetchFleets')
    await store.dispatch('fetchTrailers')

    trailers.value = store.getters.trailers
    drivers.value = store.getters.drivers
    fleets.value = store.getters.fleets
    trucks.value = store.getters.trucks
    truck.value = store.getters.detailTruck  

  } catch (err) {
    loading.value = false
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await dispatch()
})

const searchTruck = () => {
  const search = searchValue.value

  const filteredTrucks = trucks.value.filter(item => {
    return item.FltId.fltFleetNo.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return trucks.value = store.getters.trucks
  }
  trucks.value = filteredTrucks
  
  
}

const editTruck = async item => {
  router.push({ name: "truck-details", params: { id: item.id } })
  await dispatch()
}

const editSelected = item => {
  editTruck(item)
}

const submitForm = async () => {
  try {
    await store.dispatch('updateTruck', truck.value)
    successAlert.value = true
    setTimeout(() => {
      successAlert.value = false
    }, 3000)
    await dispatch()
  } catch (err) {
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 3000)
  }
  await dispatch()
}

const deleteTruck = async item => {
  await store.dispatch('deleteTruck', item.id)
  await dispatch()
  router.push({ name: "trucks" })
}

const disabled = ref(true)
const dialog = ref(false)

const editEnabled = () => {
  disabled.value = false
}

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
}
</script>

<template>
  <VCard class="d-flex gap-6">
    <div class="searchable">
      <VCardText> 
        <div class="d-flex">
          <VTextField
            v-model="searchValue"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            variant="underlined"
            class="mb-4"
            @input="searchTruck"
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
          v-if="truck"
          class="wrapper scrollable"
        >
          <div
            v-for="(item, index) in trucks"
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
                    <span class="font-weight-semibold me-2 mb-4">Fleet: {{ item.FltId.fltFleetNo }}</span>
                    <p class="font-weight-semibold me-2 mb-4">
                      Driver: {{ item.DrvId.driver_name }}
                    </p>
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
          <p>No Trucks Found</p>
        </div>
      </VCardText>
    </div>
    <VDivider vertical />
    <div class="">
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
            text="Truck details saved successfully"
          />
          <VAlert
            v-model="errorAlert"
            border="start"
            variant="tonal"
            closable
            close-label="Close Alert"
            type="error"
            title="Error!"
            text="Truck details not saved successful"
          />
          <!-- 👉 Form -->
          <VForm
            class="mt-10"
            :disabled="disabled"
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
                      Delete Truck
                    </VCardTitle>
                    <VCardText>
                      Are you sure you want to delete this truck?
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
                        @click="deleteTruck(truck)"
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
                    Truck Details
                  </h3>
                  <p class="mb-2">
                    Please fill in the form below to edit selected truck
                  </p>
                </div>
              </div>
            </VCardText>
            <VRow class="mt-6">
              <!-- 👉 Driver -->
              <VCol
                md="6"
                cols="12"
              >
                <VSelect
                  v-model="truck.DrvId"
                  :loading="loading"
                  :items="drivers"
                  item-title="driver_name"
                  item-value="id"
                  label="Driver"
                  placeholder="Select a driver"
                  :rules="[isEmptyValidator]"
                />
              </VCol>
              <!-- 👉 Fleet -->
              <VCol
                md="6"
                cols="12"
              >
                <VSelect
                  v-model="truck.FltId"
                  :loading="loading"
                  :items="fleets"
                  item-title="fltFleetNo"
                  item-value="id"
                  label="Fleet"
                  placeholder="Select a fleet"
                  :rules="[isEmptyValidator]"
                />
              </VCol>
              <!-- 👉 Trailer -->
              <VCol
                md="6"
                cols="12"
              >
                <VSelect
                  v-model="truck.TrlId"
                  :items="trailers"
                  :loading="loading"
                  item-title="plate_number"
                  item-value="id"
                  label="Trailer"
                  placeholder="Select a trailer"
                  :rules="[isEmptyValidator]"
                />
              </VCol>
              <!-- 👉 Is Active -->
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="truck.trkActive"
                  label="Is Active"
                  :items="[{text: 'Active', value: true}, {text: 'Inactive', value: false}]"
                  item-value="value"
                  item-title="text"
                />
              </VCol>
              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  color="primary gap-4"
                  @click="submitForm"
                >
                  Save
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCol>
      </VRow> 
    </div>     
  </VCard>
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
