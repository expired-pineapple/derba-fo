<!-- eslint-disable vue/no-restricted-class -->
<script setup>
const successAlert = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}


const submitForm = () => {
  // Submit form data to backend
  console.log('Form submitted')
  successAlert.value=true
  resetForm()
  
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
                    v-model="driverName"
                    :items="['Abebe Kebede','Jane Doe', 'Chaltu Kebede','Yohannes Alemu']"

                    label="Driver Name"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField

                    label="Leave Type"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField label="Address During Leave" />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    type="date"
                    label="Leave Start Date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    type="date"
                    label="Leave End Date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    type="date"
                    label="Last Work Date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    type="date"
                    label="First Work Date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    label="Leave Filled Date"
                    type="date"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="leavedays"
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

