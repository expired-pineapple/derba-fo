<script setup>
import router from "@/router"
import { ref, defineProps, computed, onBeforeMount } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"

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

const store = useStore()
const route = useRoute()

const accountData = ref("")
const driverID = route.params.id 
const loading = ref(true)

onBeforeMount(async () => {
  await store.dispatch('fetchDriver', driverID)
  accountData.value = store.getters.driver
  loading.value = false

})


const error= computed(() => store.getters.createError)

const editInfo = ref(false)
const errorMessage = ref(false)
const success = ref(false)

const  submitForm = () => {
  try{
    store.dispatch('updateDriver', { driverId: accountData.value.id, driverData: accountData.value })
    if(!error.value){
      store.dispatch('fetchDriver', accountData.value.id)
      success.value = true
      setTimeout(() => {
        success.value = false
      }, 3000)
    }else{
      errorMessage.value = true
      setTimeout(() => {
        errorMessage.value = false
      }, 3000)
    }
  }catch(e){
    console.log(e)
  }
  
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
      @click="editInfo = !editInfo"
    />
  </div>
  <VCardText>
    <VAlert
      v-if="success"
      type="success"
      text="Driver updated successfully"
      dismissible
      border="left"
      elevation="2"
      colored-border
      icon="mdi-check-circle-outline"
      class="mb-4"
    />
    <VAlert
      v-if="errorMessage"
      text="Something went wrong. Please try again later."
      type="error"
      dismissible
      border="left"
      elevation="2"
      colored-border
      icon="mdi-alert-circle-outline"
      class="mb-4"
    />
    
    <VForm
      :disabled="!editInfo"
      :loading="loading"
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
        @click="submitForm"
      >
        Save
      </VBtn>   
    </VForm>
  </VCardText>
</template>
