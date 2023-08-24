<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const tireData = {
  NewTyerID: "",
  TrkId: "",
  UserId: "",
  ReturningIssuNo: "",
  RtrnTyerClosingDate: "",
  RtrnTyerClosingKM: "",
  TyerClosingRemark: "",
  RtrnTyerActive: false,
}

const tire = ref(structuredClone(tireData))
const newTires = ref([])
const trucks = ref([])
const errors = ref([])
const success = ref(false)

const loading = ref(true)

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchTireProvisions")
    newTires.value = store.getters.tireProvisions
    await store.dispatch("fetchTrucks")
    trucks.value = store.getters.trucks
  } catch (err) {
    console.error('Error dispatching fetchNewTires action:', err)
  } finally {
    loading.value = !loading.value
  }
})

const submitForm = async () => {
  try {
    await store.dispatch("createTireReturn", tire.value)
    success.value = true
    setTimeout(() => {
      router.push('/tire-return')
    }, 1000)
  } catch (err) {
    console.error('Error dispatching createTireReturn action:', err)
    errors.value = err
  }
}

const resetForm = () => {
  tire.value = structuredClone(tireData)
}

const items = [
  { text: 'Yes', value: true },
  { text: 'No', value: false },
]

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
}
</script>

<template>
  <VRow>
    <VAlert
      v-if="success"
      type="success"
      dismissible
      border="left"
      variant="tonal"
      icon="mdi-check-circle-outline"
    >
      Tire returned successfully
    </VAlert>
    <VAlert
      v-if="errors.length"
      type="error"
      dismissible
      border="left"
      variant="tonal"
      icon="mdi-alert-circle-outline"
    >
      <ul>
        <li
          v-for="error in errors"
          :key="error"
        >
          {{ error }}
        </li>
      </ul>
    </VAlert>
  </VRow>
  <VCard title="Tire Return Details">
    <VDivider />
    <VCardText>
      <p>
        Fill the form below to register a new Tire Return.
      </p>  
    </VCardText>
    <VCardText>
      <VForm @submit.prevent="submitForm">
        <VRow>
          <VCol
            md="6"
            cols="12"
          >
            <VSelect
              v-model="tire.NewTyerID"
              :items="newTires"
              item-title="NewTyerBrand"
              label="Tire"
              item-value="id"
              :rules="[isEmptyValidator]"
              outlined
              dense
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VSelect
              v-model="tire.TrkId"
              :items="trucks"
              item-title="FltId.fltFleetNo"
              label="Truck"
              item-value="id"
              :rules="[isEmptyValidator]"
              outlined
              dense
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="tire.ReturningIssuNo"
              label="Issue Number"
              :rules="[isEmptyValidator]"
              outlined
              dense
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="tire.RtrnTyerClosingDate"
              label="Closing Date"
              type="date"
              :rules="[isEmptyValidator]"
              outlined
              dense
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="tire.RtrnTyerClosingKM"
              label="Closing KM"
              :rules="[isEmptyValidator]"
              outlined
              dense
            />
          </VCol>
          <VCol>
            <VSelect
              v-model="tire.RtrnTyerActive"
              :items="items"
              item-value="value"
              item-title="text"
              label="Active"
            />
          </VCol>
          <VCol
            md="12"
            cols="12"
          >
            <VTextarea
              v-model="tire.TyerClosingRemark"
              label="Closing Remark"
              :rules="[isEmptyValidator]"
              outlined
              dense
            />
          </VCol>
          <VCol>
            <VBtn
              type="submit"
              color="primary"
              class="mr-4"
            >
              Submit
            </VBtn>
            <VBtn
              type="reset"
              variant="tonal"
              @click="() => resetForm"
            >
              Reset
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
