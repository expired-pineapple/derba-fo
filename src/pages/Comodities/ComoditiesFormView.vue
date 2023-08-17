<!-- eslint-disable vue/no-restricted-class -->
<script setup>
import { useStore } from 'vuex'
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const successAlert = ref(false)
const errorAlert = ref(false)

const router = useRouter()

const mtrCat = ref([])

onBeforeMount(async () => {
  await store.dispatch('fetchMtrcats')
  mtrCat.value = store.getters.mtrcats
  console.log(mtrCat.value)
})

const data = ref({
  mtrName: "",
  mtrCat: "",
  mtrPackaging: "",
})



const resetForm = () => {
  data.value = {
    mtrName: "",
    mtrCat: "",
    mtrPackaging: "",
  }
}


const submitForm = () => {
  store.dispatch("createCommodity", data.value)

  const error = computed(() => store.getters.foError)

  if (error.value) {
    console.error('Error dispatching createComoditie action:', error.value)
    errorAlert.value = true
  } else {
    successAlert.value = true
    resetForm()
  }
  
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
        text="Comoditie Form saved successfully"
      />
      <VAlert
        v-model="errorAlert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        type="error"
        title="Error!"
        text="Comoditie Form not saved successfully"
      />
      <VCard title="Comoditie Form">
        <VDivider />
        <VCardText>
          <p>
            <strong>Comodity Form</strong> is a form for registering new Comodities.
          </p>  
        </VCardText>
        <VCardText>
          <VForm>
            <VContainer>
              <VRow>
                <VCol>
                  <VTextField
                    v-model="data.mtrName"
                    label="Comodity Name"
                    required
                  />
                </VCol>
                <VCol>
                  <VSelect
                    v-model="data.mtrCat"
                    label="Comodity Category"
                    required
                    :items="mtrCat"
                    item-title="mtrCatCol"
                    item-value="id"
                  />
                </VCol>
                <VCol>
                  <VTextField
                    v-model="data.mtrPackaging"
                    label="Comodity Packaging"
                    required
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

