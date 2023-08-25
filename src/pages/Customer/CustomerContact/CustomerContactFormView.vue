<!-- eslint-disable vue/no-restricted-class -->
<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const successAlert = ref(false)
const errorAlert = ref(false)

const router = useRouter()

const data = ref({
  "customer": "",
  "cntName": "",
  "cntPhone": "",
  "customerID": null,
})


const customers = ref([])
const { fetchCustomers } = mapActions('FOModule', ['fetchCustomers'])

const loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true
    await store.dispatch('fetchCustomers')
    customers.value = store.getters.customers
  } catch (err) {
  }finally {
    loading.value = false
  }
})

const resetForm = () => {
  data.value = {
    "cntName": "",
    "cntPhone": "",
    "customerID": null,
  }
}



const submitForm =  async () => {
  await store.dispatch("createCustomerContact", data.value)

  const error = computed(() => store.getters.foError)

  if (error.value) {
    errorAlert.value = true
  } else {
    store.dispatch('fetchCustomerContacts')
    successAlert.value = true
    resetForm()
  } 
  
}

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required"
  }

  return true
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
        text="Customer Contact Form saved successfully"
      />
      <VAlert
        v-model="errorAlert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        type="error"
        title="Error!"
        text="Customer Form not saved successfully"
      />
      <VCard title="Customer Contact Form">
        <VDivider />
        <VCardText>
          <p>
            <strong>Customer Form</strong> is a form for registering new customers.
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
                    v-model="data.customer"
                    :items="customers"
                    item-title="cmrName"
                    item-value="id"
                    label="Customer"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.cntName"
                    label="Contact Name"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.cntPhone"
                    label="Contact Phone"
                    :rules="[isEmptyValidator]"
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

