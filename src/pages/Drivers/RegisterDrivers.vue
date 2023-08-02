<script setup>
const accountData = {
  driver_name: "",
  phone: "",
  email: "",
  permanent_residence: "",
  driver_dmc_id: "",
  department: "",
  Job_title: "",
  employment_status: "",
  note_on_driver: "",
}

const accountDataLocal = ref(structuredClone(accountData))
const successAlert = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const submitForm = () => {
  successAlert.value = false // Set successAlert to false at the beginning
  // Submit form data to backend
  console.log('Form submitted')
  successAlert.value = true
}
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
          text="Driver details saved successfully"
        />
        <VCard title="Driver Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new driver.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <!-- 👉 Full Name -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.driver_name"
                    label="Full Name"
                    placeholder="John Doe"
                    required
                  />
                </VCol>
  
                <!-- 👉 Email -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.email"
                    label="E-mail"
                    type="email"
                    placeholder="johnDoe@example.com"
                  />
                </VCol>
  
                <!-- 👉 Permanent Residence -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.org"
                    label="Permanent Residence"
                    placeholder="Addis Ababa, Ethiopia"
                  />
                </VCol>
  
                <!-- 👉 Phone -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.phone"
                    label="Phone Number"
                    placeholder="+251 912 3456 78"
                  />
                </VCol>
  
                <!-- 👉 driver_dmc_id -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.driver_dmc_id"
                    label="Driver DMC ID"
                    placeholder="D01234"
                  />
                </VCol>
  
                <!-- 👉 department -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.department"
                    label="Department"
                    placeholder="Logistics"
                  />
                </VCol>
  
                <!-- 👉 Job_title -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.Job_title"
                    label="Job Title"
                    placeholder="Driver"
                  />
                </VCol>
  
                <!-- 👉 employment_status -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="accountDataLocal.employment_status"
                    label="Employment Status"
                    :items="['Active', 'Inactive', 'On leave']"
                  />
                </VCol>
  
                <!-- 👉   note_on_driver -->
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextarea
                    v-model="accountDataLocal.note_on_driver"
                    label="Note On Driver"
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
