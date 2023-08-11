<script setup>
import { ref, defineProps } from "vue"

const model = defineProps({
  id: String,
  driver_name: String,
  email: String,
  phone: String,
  permanent_residence: String,
  driver_dmc_id: String,
  department: String,
  Job_title: String,
  employment_status: String,
  note_on_driver: String,
  is_active: Boolean,
})

const accountData = ref(model)

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
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="accountData.driver_name"
            label="Driver Name"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="accountData.email"
            label="Email"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="accountData.phone"
            label="Phone"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="accountData.permanent_residence"
            label="Permanent Residence"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="accountData.driver_dmc_id"
            label="Driver DMC ID"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="accountData.department"
            label="Department"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="accountData.Job_title"
            label="Job Title"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VSelect
            v-model="accountData.employment_status"
            :items="['Active', 'Inactive']"
            label="Employment Status"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="accountData.note_on_driver"
            label="Note on Driver"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VSwitch
            v-model="accountData.is_active"
            label="Active"
          />
        </VCol>
      </VRow>
      <VBtn
        color="primary"
        type="submit"
        class="mt-4"
      >
        Save
      </VBtn>   
    </VForm>
  </VCardText>
</template>
