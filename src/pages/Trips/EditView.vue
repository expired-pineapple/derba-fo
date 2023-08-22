<script lang="ts" setup>
import { ref, onBeforeMount } from "vue"
import { useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const id = route.params.id

console.log('ID:', id)

const loading = ref(true)

const successAlert = ref(false)
const errorAlert = ref(false)

const trip = ref({})
const routes = ref([])


const dispatch = async () => {
  try {
    loading.value = true
    await store.dispatch("fetchRoutes")
    await store.dispatch("fetchRoutes", id)
    trip.value = store.getters.route
    routes.value = store.getters.routes

    console.log('trip:', trip.value)
  } catch (err) {
    console.error('Error dispatching in route form:', err)
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

  const filteredRoutes = routes.value.filter(item => {
    return item.trpOrigin.toLowerCase().includes(search.toLowerCase()) || item.trpDestination.toLowerCase().includes(search.toLowerCase())|| item.trpRouteName.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return routes.value = store.getters.routes
  }
  routes.value = filteredRoutes
  
  
}

const editRoute  = async item => {
  console.log('Editing:', item)
  router.push({ name: "edit-routes", params: { id: item.id } })
  await dispatch()
}

const editSelected = item => {
  editRoute (item)
}

const submitForm = async () => {
  console.log('Submitting form...')
  try {
    await store.dispatch('updateRoute', { id, route: trip.value })
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

const deleteRoute = async item => {
  console.log('Deleting:', item)
  await store.dispatch('deleteRoute', item.id)
  await dispatch()
  router.push('/trip-information')
}

const disabled = ref(true)
const dialog = ref(false)
const expanded = ref(false)

const items = [
  { value: true, text: 'Yes' },
  { value: false, text: 'No' },
]

const editEnabled = () => {
  disabled.value = false
}
</script>

<template>
  <div class="d-flex">
    <VCard
      v-if="expanded"
      width="380"
      class="mr-4"
    >
      <VCardItem>
        <div class="d-flex">
          <VIcon class="text-primary mt-3">
            mdi-magnify
          </VIcon>
          <input
            v-model="searchValue"
            type="text"
            placeholder="Search"
            class="search"
            @input="search"
          >
        </div>
      </VCardItem>
      <VDivider
        color="primary"
        class="mb-4"
      />
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
        v-if="routes.length > 0"
        class="wrapper scrollable"
      >
        <div
          v-for="(item, index) in routes"
          :key="index"
        >
          <div class="d-flex mt-4">
            <VIcon
              icon="mdi-map-marker-path" 
              size="30"
              class="me-2"
              color="primary"
            />  
            <div>
              <div class="d-flex">
                <div class="info">
                  <span class="font-weight-semibold me-4 mb-4">Route : {{ item.trpRouteName }}</span>
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
        </div>
      </div>
    </VCard>
    <VCard class="d-flex gap-6">
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
                text="Route details saved successfully"
              />
              <VAlert
                v-model="errorAlert"
                border="start"
                variant="tonal"
                closable
                close-label="Close Alert"
                type="error"
                title="Error!"
                text="Route details not saved successfully"
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
                          Delete Tire
                        </VCardTitle>
                        <VCardText>
                          Are you sure you want to delete this Tire?
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
                            @click="deleteRoute(trip)"
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
                      icon="mdi-map-marker-path"
                      class="me-6"  
                    />
                    <div>
                      <h3 class="font-weight-semibold mb-2">
                        Route Details
                      </h3>
                      <p class="mb-2">
                        Please fill in the form below to edit selected route details
                      </p>
                    </div>
                  </div>
                </VCardText>
                <VForm>
                  <VRow>
                    <!-- 👉 Origin -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpOrigin"
                        label="Origin"
                      />
                    </VCol>
    
                    <!-- 👉 Destination -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpDestination"
                        label="Destination"
                      />
                    </VCol>
    
                    <!-- 👉 Distance -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpDistanceKm"
                        label="Distance (Km)"
                      />
                    </VCol>
    
                    <!-- 👉 Route Name -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpRouteName"
                        label="Route Name"
                      />
                    </VCol>
    
                    <!-- 👉 Turnaround Time -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpTurnaroundTime"
                        label="Turnaround Time"
                      />
                    </VCol>
    
                    <!-- 👉 Average Fuel -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpAvrgFuel"
                        label="Average Fuel"
                      />
                    </VCol>
    
                    <!-- 👉 Days -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpDays"
                        label="Days"
                      />
                    </VCol>
    
                    <!-- 👉 Left Fuel -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpLBltr"
                        label="Left Fuel (Ltr)"
                      />
                    </VCol>
    
                    <!-- 👉 Right Fuel -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpRltr"
                        label="Right Fuel (Ltr)"
                      />
                    </VCol>
                    <!-- 👉 Spare Fuel -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpSltr"
                        label="Spare Fuel (Ltr)"
                      />
                    </VCol>
                    <!-- 👉 Total Fuel -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpTltr"
                        label="Total Fuel (Ltr)"
                      />
                    </VCol>
                    <!-- 👉 Used Fuel -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="trip.trpUltr"
                        label="Used Fuel (Ltr)"
                      />
                    </VCol>
    
                    <VCol
                      cols="12"
                      class="d-flex flex-wrap gap-4"
                    >
                      <VBtn @click.prevent="submitForm">
                        Save
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </vform>
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
