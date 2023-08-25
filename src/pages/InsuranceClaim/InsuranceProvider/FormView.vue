<!-- eslint-disable vue/no-restricted-class -->
<script setup>
import { useStore } from 'vuex'
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const successAlert = ref(false)
const errorAlert = ref(false)

const router = useRouter()


const data = ref({
  mtrCatCol: "",
})



const resetForm = () => {
  data.value = {
    insuranceProvider: "",
  }
}


const submitForm = async() => {
  await store.dispatch("createInsuranceProvider", data.value)

  const error = computed(() => store.getters.foError)

  if (error.value) {
    console.error('Error dispatching createInsuranceProvider action:', error.value)
    errorAlert.value = true
  } else {
    successAlert.value = true
    resetForm()
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
        text="Insurance Provider Form saved successfully"
      />
      <VAlert
        v-model="errorAlert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        type="error"
        title="Error!"
        text="Insurance Provider Form not saved successfully"
      />
      <VCard title="Insurance Provider Form">
        <VDivider />
        <VCardText>
          <p>
            <strong>Insurance Provider Form</strong> is a form for registering new Insurance Provider.
          </p>  
        </VCardText>
        <VCardText>
          <VForm>
            <VContainer>
              <VRow>
                <VCol>
                  <VTextField
                    v-model="data.insuranceProvider"
                    label="Insurance Provider"
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
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

