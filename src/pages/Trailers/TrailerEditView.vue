<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeMount } from "vue"
import { mapActions, useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const trailerId = route.params.id

console.log('Truck ID:', trailerId)

const loading = ref(true)

const successAlert = ref(false)
const errorAlert = ref(false)

const trailer = ref({})
const trailers = ref([])


const dispatch = async () => {
  try {
    loading.value = true
    await store.dispatch("fetchTrailers")
    await store.dispatch("fetchTrailer", trailerId)
    trailers.value = store.getters.trailers

    trailer.value = store.getters.trailer
    console.log('Trailer:', trailer.value)
  } catch (err) {
    console.error('Error dispatching in trailer form:', err)
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await dispatch()
})

const searchTrailer = () => {
  console.log('Searching trailer...')

  const search = searchValue.value

  const filteredTrailers = trailers.value.filter(item => {
    return item.plate_number.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return trailers.value = store.getters.trailers
  }
  trailers.value = filteredTrailers
  
  
}

const editTrailer = async item => {
  console.log('Editing trailer:', item)
  router.push({ name: "trailer-edit", params: { id: item.id } })
  await dispatch()
}

const editSelected = item => {
  editTrailer(item)
}

const submitForm = async () => {
  console.log('Submitting form...')
  try {
    await store.dispatch('updateTrailer', trailer.value)
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

const deleteTrailer = async item => {
  console.log('Deleting Trailer:', item)
  await store.dispatch('deleteTrailer', item.id)
  await dispatch()
  router.push('/trailers')
}

const disabled = ref(true)
const dialog = ref(false)
const expanded = ref(false)

const editEnabled = () => {
  disabled.value = false
}
</script>

<template>
  <VCard class="d-flex gap-6">
    <div
      v-if="expanded"
      class="searchable"
    >
      <VCardText> 
        <div class="d-flex">
          <VTextField
            v-model="searchValue"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            variant="underlined"
            class="mb-4"
            @input="searchTrailer"
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
          v-if="trailers.length > 0"
          class="wrapper scrollable"
        >
          <div
            v-for="(item, index) in trailers"
            :key="index"
          >
            <div class="d-flex mt-4">
              <VIcon
                icon="mdi-truck-trailer" 
                size="30"
                class="mr-2"
                color="primary"
              />  
              <div>
                <div class="d-flex">
                  <div class="info">
                    <span class="font-weight-semibold me-2 mb-4">Trailer: {{ item.plate_number }}</span>
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
          <p>No Trailers Found</p>
        </div>
      </VCardText>
    </div>
    <VDivider
      v-if="expanded"
      vertical
    />
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
              text="Trailer details saved successfully"
            />
            <VAlert
              v-model="errorAlert"
              border="start"
              variant="tonal"
              closable
              close-label="Close Alert"
              type="error"
              title="Error!"
              text="Trailer details not saved successfully"
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
                        Delete Trailer
                      </VCardTitle>
                      <VCardText>
                        Are you sure you want to delete this Trailer?
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
                          @click="deleteTrailer(trailer)"
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
                    icon="mdi-truck-trailer"
                    class="me-6"  
                  />
                  <div>
                    <h3 class="font-weight-semibold mb-2">
                      Trailer Details
                    </h3>
                    <p class="mb-2">
                      Please fill in the form below to edit selected trailer
                    </p>
                  </div>
                </div>
              </VCardText>
              <VRow
                md="6"
                cols="12"
              >
                <VSwitch
                  v-model="trailer.is_active"
                  label="Is Active"
                  required
                  outlined
                  dense
                />
              </VRow>
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trailer.fleet_number"
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
                    v-model="trailer.plate_number"
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
                    v-model="trailer.trailer_model"
                    label="Trailer Model"
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
                    v-model="trailer.trailer_type"
                    label="Trailer Type"
                    required
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="trailer.driver"
                    :items="drivers"
                    item-title="driver_name"
                    item-value="id"
                    label="Driver"
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
                    v-model="trailer.capacity"
                    label="Capacity"
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
                    v-model="trailer.chasis_number"
                    label="Chasis Number"
                    required
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="trailer.condition"
                    :items="conditions"
                    item-title="condition"
                    item-value="id"
                    label="Condition"
                    required
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="12"
                  cols="12"
                >
                  <VTextarea
                    v-model="trailer.remarks"
                    label="Remarks"
                    required
                    outlined
                    dense
                  />
                </VCol>

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
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    type="reset"
                  >
                    Reset
                  </VBtn>
                </VCol>
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
