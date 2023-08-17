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
        text="Customer Form saved successfully"
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
      <VCard
        title="Customer Form"
        :loading="loading"
      >
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
                  <VTextField
                    v-model="customer.cmrCode"
                    label="Customer Code"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="customer.cmrName"
                    label="Customer Name"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="customer.cmrTIN"
                    label="Customer TIN"
                    required
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="customer.cmrAddress"
                    label="Customer Address"
                    required
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="customer.cmrPhone"
                    label="Customer Phone"
                    required
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
                </VCol>
              </VRow>
            </VContainer>
          </VForm>
        </VCardText>
      </VCard>
    </vcol>
  </vrow>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { mapActions, useStore } from 'vuex'
import { useRoute } from 'vue-router'

const expand = ref(false)

const route = useRoute()

const store = useStore()

console.log('route.params.id:', route.params)

const loading = ref(false)
const { fetchCustomer } = mapActions('FOModule', ['fetchCustomer'])


const customer = ref({})

onBeforeMount(async () => {
  try {
    loading.value = true
    await store.dispatch('fetchCustomer', route.params.id )
    customer.value = store.getters.customer
  } catch (err) {
    console.error('Error dispatching fetchCustomer action:', err)
  } finally {
    loading.value = false
  }
})


console.log('customer:', customer.value)

const customers = ref(store.getters.customers)

const successAlert = ref(false)
const errorAlert = ref(false)

const updateCustomer = mapActions('FOModule', ['updateCustomer'])

const submitForm = async () => {
  try {
    await store.dispatch('updateCustomer', { id: route.params.id, customer: customer.value })
    console.log('customer:', customer.value)
    await store.dispatch('fetchCustomers')
    successAlert.value = true
  } catch (err) {
    console.error('Error dispatching updateCustomer action:', err)
    errorAlert.value = true
  }
}
</script>
