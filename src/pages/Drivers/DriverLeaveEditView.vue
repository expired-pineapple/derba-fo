<!-- eslint-disable vue/no-restricted-class -->
<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()

const logID = ref(route.params.id)

const store = useStore()

onMounted(async () => {
  try {
    await store.dispatch("fetchDriverLeaveLogEd", logID.value)
    await store.dispatch("fetchDrivers")
  } catch (err) {
    console.error('Error dispatching fetchDriverLeaveLog action:', err)
  }
})

const items = computed(() => store.getters.driverLeaveLog)

const drivers = computed(() => store.getters.drivers)

const options = computed(() => {
  return drivers.value.map(driver => {
    return {
      text: driver.driver_name,
      value: driver.id,
    }
  })
})

console.log(options.value, "op")

const currentDriver = computed(() => {
  return drivers.value.find(driver => driver.id === items.value.driverID)
})

const successAlert = ref(false)
const errorAlert = ref(false)

const loading = ref(computed(() => store.getters.loading))

const submitForm = () =>{
  console.log(items.value)
  try{
    store.dispatch("updateDriverLeaveLog", { leaveId: logID.value, leaveData: items.value })
    
    const error = computed(() => store.getters.createError)
    if (error.value) {
      errorAlert.value = true
      console.error('Error dispatching updateDriverLeaveLog action:', error.value)
    } else {
      successAlert.value = true
      router.push({  name: "driver-leave-logs" })
    }
  }catch(error){
    console.log(error)
  }
}
</script>

<template>
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
        text="Leave Form saved successfully"
      />
      <VAlert
        v-model="errorAlert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        type="error"
        title="Error!"
        text="Something went wrong"
      />
      <VCard title="Leave Form">
        <VDivider />
        <VCardText>
          <p>
            You're currently editting a driver leave.
          </p>  
        </VCardText>
        <VCardText>
          <VForm>
            <VContainer>
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="items.driverID"
                    label="Driver Name"
                    :items="options"
                    item-title="text"
                    :loading="loading"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="items.drvLeaveType"
                    label="Leave Type"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="items.AddressDuringLeave" 
                    label="Address During Leave"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="items.drvLeaveStartDate"
                    type="date"
                    label="Leave Start Date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="items.drvLeaveEndDate"
                    type="date"
                    label="Leave End Date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="items.LastworkDate"
                    type="date"
                    label="Last Work Date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="items.LastworkDate"
                    type="date"
                    label="First Work Date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="items.leavefilledDate"
                    label="Leave Filled Date"
                    type="date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="items.leavedays"
                    label="Leave Days"
                  />
                </VCol>
              </VRow>
              <VRow>
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
            </VContainer>
          </VForm>
        </VCardText>
      </VCard>
    </vcol>
  </vrow>
</template>

