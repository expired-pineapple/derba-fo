<script lang="ts" setup>
import { ref } from "vue"

const emergency_contact = {
  drvContactName: "Jane Doe",
  drvContactPhone: "+251 912 3456 78",
  drvContactRelationship: "Sister",
  drvContactAdress: "Addis Ababa, Ethiopia",
  drvContactActiveStatus: true,
}

const emergency_contact_local = ref(structuredClone(emergency_contact))

const editEmergencyContact = ref(false)

const submitForm = () => {
  console.log(emergency_contact_local.value)
}
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
      @click="editEmergencyContact = !editEmergencyContact"
    />
  </div>
  <VCardText>
    <VForm class="">
      <VRow>
        <!-- 👉 Full Name -->
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="emergency_contact_local.drvContactName "
            :disabled="!editEmergencyContact"
            label="Contact Name "
            placeholder="Jane Doe"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="emergency_contact_local.drvContactPhone"
            label="Contact Phone"
            placeholder="+251 912 3456 78"
            :disabled="!editEmergencyContact"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="emergency_contact_local.drvContactRelationship"
            label="Contact Relationship"
            placeholder="Sister"
            :disabled="!editEmergencyContact"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="emergency_contact_local.drvContactAdress"
            label="Contact Adress"
            placeholder="Addis Ababa, Ethiopia"
            :disabled="!editEmergencyContact"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VSwitch
            v-model="emergency_contact_local.drvContactActiveStatus"
            label="Contact Active Status"
            :disabled="!editEmergencyContact"
          />
        </VCol>
        <!-- 👉 Form Actions -->
        <VCol
          cols="12"
          class="d-flex flex-wrap gap-4"
        >
          <VBtn
            :disabled="!editEmergencyContact"
            color="primary gap-4"
            @click="submitForm"
          >
            Save Changes
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>

