<!-- eslint-disable vue/no-restricted-class -->
<script setup>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const successAlert = ref(false)
const errorAlert = ref(false)

const router = useRouter()

const data = ref({
  cmrCode: "",
  cmrName: "",
  cmrTIN: "",
  cmrAddress: "",
  cmrPhone: "",
})



const resetForm = () => {
  data.value = {
    cmrCode: "",
    cmrName: "",
    cmrTIN: "",
    cmrAddress: "",
    cmrPhone: "",
  }
}


const submitForm = async () => {
  try {
    await store.dispatch("createCustomer", data.value)

    const error = computed(() => store.getters.foError)

    if (error.value) {
      errorAlert.value = true
    } else {
      successAlert.value = true
    }
  } catch (err) {
  }
}

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
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
      <VCard title="Customer Form">
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
                    v-model="data.cmrCode"
                    label="Customer Code"
                    required
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.cmrName"
                    label="Customer Name"
                    required
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.cmrTIN"
                    label="Customer TIN"
                    required
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.cmrAddress"
                    label="Customer Address"
                    required
                    :rules="[isEmptyValidator]"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="data.cmrPhone"
                    label="Customer Phone"
                    required
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

