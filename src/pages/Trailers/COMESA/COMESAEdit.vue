<script lang="ts" setup>
import { ref, onBeforeMount, computed } from "vue"
import { useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const id = route.params.id


const loading = ref(true)
const expanded = ref(false)

const successAlert = ref(false)
const errorAlert = ref(false)

const data = ref({})
const comesa = ref([])
const trucks = ref([])
const trailers =ref([])

const dispatch = async () => {
  try {
    await store.dispatch("fetchTrailerCOMESAs")
    await store.dispatch("fetchTrailerCOMESA", id)
    await store.dispatch("fetchTrucks")
    await store.dispatch("fetchTrailers")
    trucks.value = store.getters.trucks
    trailers.value = store.getters.trailers
    
    data.value = store.getters.trailerCOMESAs
    comesa.value = store.getters.trailerCOMESA
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
  const search = searchValue.value

  const filteredCOMESAs = data.value.filter(item => {
    return item.trlInsRegistrationNo.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return data.value = store.getters.trailerCOMESAs
  }
  data.value = filteredCOMESAs
  
  
}

const edit = async item => {
  router.push({ name: 'edit-trailer-comesa', params: { id: item.id } })
  await store.dispatch('fetchTrailerCOMESA', item.id)
  comesa.value = store.getters.trailerCOMESA
}

const editSelected = item => {
  edit(item)
}


const submitForm = async () => {
  try {
    await store.dispatch('updateTrailerCOMESA', comesa.value)
    await dispatch()

    const error = computed(() => store.getters.vehicleError)
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
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 3000)
  }
  await dispatch()
}

const deleteItem = async item => {
  await store.dispatch('deleteTrailerBolo', item.id)
  await dispatch()
  router.push('/trailer-insurance')
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

const hasExpired = value =>{
  const date = new Date(value)
  if(date < new Date()){
    return "Document has expired"
  }
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
                  icon="mdi-truck-trailer" 
                  size="30"
                  class="mr-2"
                  color="primary"
                />  
                <div>
                  <div class="d-flex">
                    <div class="info">
                      <span class="font-weight-semibold me-2 mb-4">COMESA: {{ item.trlComesaNo }}</span>
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
            <p>No COMESA Found</p>
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
                            @click="deleteItem(comesa)"
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
                        Trailer COMESA Details
                      </h3>
                      <p class="mb-2">
                        Please fill in the form below to edit selected bolo
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
                            v-model="comesa.TrkId"
                            :items="trucks"
                            item-value="id"
                            item-title="FltId.fltFleetNo"
                            label="Truck"
                            :rules="[isEmptyValidator]"
                            :loading="loading"
                          />
                        </VCol>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VSelect
                            v-model="comesa.TrlId"
                            :items="trailers"
                            item-value="id"
                            item-title="plate_number"
                            label="Trailer"
                            :rules="[isEmptyValidator]"
                            persistent-hint="Trailer plate number"
                            :loading="loading"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="comesa.trlComesaNo"
                            label="COMESA Number"
                            :rules="[isEmptyValidator]"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="comesa.trlComesaYellowNo"
                            label="Yellow Number"
                            :rules="[isEmptyValidator]"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="comesa.trlComesaIssuanceDate"
                            label="Issuance Date"
                            :rules="[isEmptyValidator]"
                            type="date"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="comesa.trlComesaValidDate"
                            label="Valid Date"
                            :rules="[isEmptyValidator]"
                            type="date"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="comesa.trlComesaCountry"
                            label="Country"
                            :rules="[isEmptyValidator]"
                          />
                        </VCol>
                        <VCol cols="12">
                          <VSwitch
                            v-model="comesa.trlComesaActive"
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
                          <VBtn
                            color="secondary"
                            variant="tonal"
                            type="reset"
                          >
                            Reset
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
