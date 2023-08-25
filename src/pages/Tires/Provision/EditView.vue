<script lang="ts" setup>
import { ref, onBeforeMount } from "vue"
import { useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const id = route.params.id


const loading = ref(true)

const successAlert = ref(false)
const errorAlert = ref(false)

const tire = ref({})
const tires = ref([])
const trucks = ref([])


const dispatch = async () => {
  try {
    loading.value = true
    await store.dispatch("fetchTrucks")
    await store.dispatch("fetchTireProvisions")
    await store.dispatch("fetchTireProvision", id)
    tires.value = store.getters.tireProvisions
    trucks.value = store.getters.trucks

    tire.value = store.getters.tireProvision
  } catch (err) {
    console.error('Error dispatching in tire form:', err)
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await dispatch()
})

const search = () => {
  const search = searchValue.value

  const filteredTires = tires.value.filter(item => {
    return item.NewTyerIssuNo.toLowerCase().includes(search.toLowerCase()) || item.NewTyerBrand.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return tires.value = store.getters.tires
  }
  tires.value = filteredTires
  
  
}

const editTire = async item => {
  router.push({ name: "edit-tire-provision", params: { id: item.id } })
  await dispatch()
}

const editSelected = item => {
  editTire(item)
}

const submitForm = async () => {
  try {
    await store.dispatch('updateTireProvision', tire.value)
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

const deleteTire = async item => {
  await store.dispatch('deleteTireProvision', item.id)
  await dispatch()
  router.push('/tire-provision')
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

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
}
</script>

<template>
  <div class="d-flex">
    <VCard
      v-if="expanded"
      width="350"
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
        v-if="tires.length > 0"
        class="wrapper scrollable"
      >
        <div
          v-for="(item, index) in tires"
          :key="index"
        >
          <div class="d-flex mt-4">
            <VIcon
              icon="mdi-tire" 
              size="30"
              class="me-2 ml-4"
              color="primary"
            />  
            <div>
              <div class="d-flex">
                <div class="info">
                  <span class="font-weight-semibold me-8 mb-4">Tire: {{ item.NewTyerIssuNo }}</span>
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
                text="Tire details saved successfully"
              />
              <VAlert
                v-model="errorAlert"
                border="start"
                variant="tonal"
                closable
                close-label="Close Alert"
                type="error"
                title="Error!"
                text="Tire details not saved successfully"
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
                            @click="deleteTire(tire)"
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
                      icon="mdi-tire"
                      class="me-6"  
                    />
                    <div>
                      <h3 class="font-weight-semibold mb-2">
                        Tire Details
                      </h3>
                      <p class="mb-2">
                        Please fill in the form below to edit selected tire details
                      </p>
                    </div>
                  </div>
                </VCardText>
                <VForm @submit.prevent="submitForm">
                  <VRow>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VSelect
                        v-model="tire.TrkId"
                        :items="trucks"
                        item-value="id"
                        label="Truck"
                        item-title="FltId.fltFleetNo"
                        :rules="[isEmptyValidator]"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="tire.NewTyerIssuNo"
                        label="Issue Number"
                        :rules="[isEmptyValidator]"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="tire.NewTyerDate"
                        label="Date"
                        :rules="[isEmptyValidator]"
                        type="date"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="tire.NewTyerKM"
                        label="KM"
                        :rules="[isEmptyValidator]"
                        type="number"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="tire.NewTyerBrand"
                        label="Brand"
                        :rules="[isEmptyValidator]"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="tire.NewTyerSerialNo"
                        label="Brand"
                        :rules="[isEmptyValidator]"
                      />
                    </VCol>
                    <VCol>
                      <VSelect
                        v-model="tire.NewTyerActive"
                        :items="items"
                        item-value="value"
                        item-title="text"
                        label="Active"
                      />
                    </VCol>
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <VTextarea
                        v-model="tire.NewTyerRemark"
                        label="Remark"
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
