<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import { useStore } from 'vuex'

import { useRoute } from 'vue-router'

const emergencyProps = defineProps({
  emergencyContact: {
    type: Array,
    required: true,
  },
})

const store = useStore()
const route = useRoute()

const loading = ref(false)

const editEmergencyContact = ref(false)

const emergencyContact = ref(emergencyProps.emergencyContact)

console.log(emergencyContact.value, "asdfg")
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
      <VRow
        v-for="emergencyCont in emergencyContact"
        :key="emergencyCont"
      >
        <!-- 👉 Full Name -->
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="emergencyCont.drvContactName"
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
            v-model="emergencyCont.drvContactPhone"
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
            v-model="emergencyCont.drvContactRelatinship"
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
            v-model="emergencyCont.drvContactAdress"
            label="Contact Adress"
            placeholder="Addis Ababa, Ethiopia"
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

