<!-- eslint-disable vue/no-restricted-class -->
<script setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const successAlert = ref(false)
const errorAlert = ref(false)
const { dispatch, getters } = useStore()

const accountData = ref({
  driverID: "",
  drvLeaveType: "",
  AddressDuringLeave: "",
  drvLeaveStartDate: "",
  drvLeaveEndDate: "",
  LastworkDate: "",
  FirstWorkDate: "",
  leavefilledDate: "",
  leavedays: "",
})

const drivers = ref([])
const loading = ref(true)

onBeforeMount(async () => {
  await dispatch('fetchDrivers')
  drivers.value = getters.drivers
  loading.value = false
})

const submitForm = async () => {
  try {
    await dispatch('createDriverLeaveLog', accountData.value)
    
    const error = getters.createError

    if (!error) {
      successAlert.value = true
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
      setTimeout(() => {
        errorAlert.value = false
      }, 5000)
    }
  } catch (e) {
    console.log(e)
  }
}

const isRequired = value => !!value || 'This Field is Required.'
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
        text="Leave Form hasn't been saved"
      />

      <VCard title="Leave Form">
        <VDivider />
        <VCardText>
          <p>
            <strong>Leave Form</strong> is a form for registering leave of drivers.
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
                    v-model="accountData.driverID"
                    :items="drivers"
                    item-title="driver_name"
                    item-value="id"
                    label="Driver"
                    :rules="[isRequired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField 
                    v-model="accountData.AddressDuringLeave"
                    label="Address During Leave"
                    :rules="[isRequired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountData.drvLeaveType"
                    label="Leave Type"
                    :rules="[isRequired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountData.drvLeaveStartDate"
                    type="date"
                    label="Leave Start Date"
                    :rules="[isRequired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountData.drvLeaveEndDate"
                    type="date"
                    label="Leave End Date"
                    :rules="[isRequired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountData.LastworkDate"
                    type="date"
                    label="Last Work Date"
                    :rules="[isRequired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountData.FirstWorkDate"
                    type="date"
                    label="First Work Date"
                    :rules="[isRequired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountData.leavefilledDate"
                    label="Leave Filled Date"
                    type="date"
                    :rules="[isRequired]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountData.leavedays"
                    label="Leave Days"
                    :rules="[isRequired]"
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

