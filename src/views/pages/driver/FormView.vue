<script setup>
const prop = defineProps({
  fullName: String,
  dmc_ID: String,
  department: String,
  phoneNumber: String,
  residenceCity: String,
  job_title: String,
  tin: String,
  email: String,
  DOB: String,
  drvEmplStartDate: Date,
  drvEmplEndDate: String,
  isActive: Boolean,
  editable: Boolean,
})


const accountData = {
  fullName: prop.fullName,
  dmc_ID: prop.dmc_ID,
  department: prop.department,
  phoneNumber: prop.phoneNumber,
  residenceCity: prop.residenceCity,
  job_title: prop.job_title,
  tin: prop.tin,
  email: prop.email,
  DOB: prop.DOB,
  drvEmplStartDate: prop.drvEmplStartDate,
  drvEmplEndDate: prop.drvEmplEndDate,
  isActive: prop.isActive,
}


const accountDataLocal = ref(structuredClone(accountData))

const editInfo = ref(false)
</script>

<template>
  <div
    class="d-flex gap-4"
    style="justify-content: flex-end;"
  >
    <VIcon
      class="cursor-pointer"
      color="primary"
      size="24"
      start
      icon="mdi-pencil-outline"
      @click="editInfo = !editInfo"
    />
  </div>
  <VCardText>
    <VForm
      :disabled="!editInfo"
      @submit.prevent="() => {}"
    >
      <VRow>
        <!-- 👉 First Name -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.fullName"
            label="Full Name"
            placeholder="Full Name"
            :disabled="prop.editable"
          />
        </VCol>

        <!-- 👉 DMC ID -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.dmc_ID"
            label="DMC ID"
            placeholder="DMC ID"
          />
        </VCol>

        <!-- 👉 Email -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.email"
            label="Email"
            placeholder="Email"
            type="email"
          />
        </VCol>
        <!-- 👉 Phone Number -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            type="number"
          />
        </VCol>
        <!-- 👉 Date of Birth -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.DOB"
            label="Date of Birth"
            placeholder="Date of Birth"
            type="date"
          />
        </VCol>
        <!-- 👉 Residence City -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.residenceCity"
            label="City"
            placeholder="City"
          />
        </VCol>
        <!-- 👉 Department -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.department"
            label="Department"
            placeholder="Department"
          />
        </VCol>


        <!-- 👉 Job Title -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.job_title"
            label="Job Title"
            placeholder="Job Title"
          />
        </VCol>

        <!-- 👉 tin -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.tin"
            label="TIN"
            placeholder="TIN"
          />
        </VCol>
        <!-- 👉 License -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.license"
            label="License"
            placeholder="License"
          />
        </VCol>
        <!-- 👉 Employement Start Date -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.drvEmplStartDate"
            label="Employement Start Date"
            placeholder="Employement Start Date"
            type="date"
          />
        </VCol>
        <!-- 👉 Employement End Date -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="accountDataLocal.drvEmplEndDate"
            label="Employement End Date"
            placeholder="Employement End Date"
            type="date"
          />
        </VCol>
        <!-- 👉 Is Active -->
        <VCol
          cols="12"
          md="6"
        >
          <VSwitch
            v-model="accountDataLocal.isActive"
            label="Is Active"
          />
        </VCol>
        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn type="submit">
            Submit
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>
