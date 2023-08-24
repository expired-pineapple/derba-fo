<script setup>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const infractionData =   {
  "infractionType": "",
  "drvId": "",
  "infractionDate": "",
  "infractionLocation": "",
  "infractionRemark": "",
}

const store = useStore()
const infractionTypes = ref([])
const drivers = ref([])
const loading = ref(true)

onBeforeMount(async() => {
  try{
    await store.dispatch("fetchInfractionTypes")
    await store.dispatch("fetchDrivers")
    infractionTypes.value = computed(() => store.getters.infractionTypes)
    drivers.value = computed(() => store.getters.drivers)
  } catch (err) {
    console.error('Error dispatching fetchInfractionTypes action:', err)
  } finally {
    loading.value = false
  }
})

const infractionDataLocal = ref(structuredClone(infractionData))
const successAlert = ref(false)

const resetForm = () => {
  infractionDataLocal.value = structuredClone(infractionData)
}

const submitForm = async() => {
  try{
    await store.dispatch("createInfraction", infractionDataLocal.value)
    successAlert.value = true
    resetForm()
  } catch (err) {
    console.error('Error dispatching createInfraction action:', err)
    errorAlert.value = true
  }
}

const isRequired = value => !!value || 'This Field is Required.'
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VAlert
          v-model="successAlert"
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          type="success"
          title="Success!"
          text="Infractions saved successfully"
        />
        <VCard title="Infractions">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new infraction.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <!-- 👉 Infraction Type -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="infractionDataLocal.infractionType"
                    label="Infraction Type"
                    :items="infractionTypes"
                    item-title="infractionType"
                    item-value="id"
                    :rules="[isRequired]"
                  />
                </VCol>
  
                <!-- 👉 Driver -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="infractionDataLocal.drvId"
                    label="Driver Name"
                    :items="drivers"
                    item-title="driver_name"
                    item-value="id"
                    :rules="[isRequired]"
                  />
                </VCol>
  
                <!-- 👉 Infraction Date -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="infractionDataLocal.infractionDate"
                    label="Infraction Date"
                    placeholder="2021-07-01"
                    type="date"
                    :rules="[isRequired]"
                  />
                </VCol>
                <!-- 👉 Infraction Location -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="infractionDataLocal.infractionLocation"
                    label="Infraction Location"
                    placeholder="Bole Road"
                    :rules="[isRequired]"
                  />
                </VCol>
                <!-- 👉 Infraction Note -->
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextarea
                    v-model="infractionDataLocal.infractionNote"
                    label="Infraction Note"
                    placeholder="Exceeded the speed limit on Bole Road"
                    :rules="[isRequired]"
                  />
                </VCol>
                <!-- 👉 Form Actions -->
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
                    @click="resetForm"
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
