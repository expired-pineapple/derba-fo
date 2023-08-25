<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"

import { useStore } from 'vuex'

import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const id = route.params.id

const loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true
    await store.dispatch("fetchDriverLeaveLog", id)
  
  } catch (err) {
    console.error('Error dispatching fetchEmergencyContact action:', err)
  }
  finally{
    loading.value = !loading.value  
  }
})


const driverLeave = computed(() => store.getters.driverLeaveLog)

const editdriverLeave = ref(false)

const submitForm = () => {
  editdriverLeave.value = !editdriverLeave.value
  store.dispatch("updateDriverLeaveLog", driverLeave.value)
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
      @click="editdriverLeave = !editdriverLeave"
    />
  </div>
  <VCardText>
    <!-- 👉 Form -->
    <VForm
      class=""
      :disabled="!editdriverLeave"
    >
      <VRow
        v-for="driverLeaveLocal in driverLeave"
        :key="driverLeaveLocal"
      >
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.drvLeaveStartDate"
            label="Leave Start Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.drvLeaveEndDate"
            label="Leave End Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.LastworkDate"
            label="Last Work Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.FirstWorkDate"
            label="First Work Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.leavefilledDate"
            label="Leave Filled Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.leavedays"
            label="Leave Days"
          />
        </VCol>
        <!-- 👉 Form Actions -->
        <VCol 
          cols="12"
          class="d-flex flex-wrap gap-4"
        >
          <VBtn
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

