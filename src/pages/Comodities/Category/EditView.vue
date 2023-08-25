<script lang="ts" setup>
import { ref, onBeforeMount, computed } from "vue"
import { useStore } from 'vuex'
import { useRoute } from "vue-router"
import router from "@/router"

const store = useStore()
const route = useRoute()
const searchValue = ref('')
const id = route.params.id

const loading = ref(true)
const expand = ref(true)

const successAlert = ref(false)
const errorAlert = ref(false)

const data = ref({})
const mtrcats = ref([])

const dispatch = async () => {
  try {
    await store.dispatch("fetchMtrcat", id)
    await store.dispatch("fetchMtrcats")
    
    mtrcats.value = store.getters.mtrcats
    data.value = store.getters.mtrcat
  } catch (err) {
    loading.value = false
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await dispatch()
})

const search = () => {

  const search = searchValue.value

  const filteredmtrcats = mtrcats.value.filter(item => {
    return item.mtrCatCol.toLowerCase().includes(search.toLowerCase())
  })

  if(!search){
    return mtrcats.value = store.getters.mtrcats
  }
  mtrcats.value = filteredmtrcats
  
  
}

const edit = async item => {
  router.push({ name: 'edit-comodity', params: { id: item.id } })
  await store.dispatch('fetchCommodity', item.id)
  data.value = store.getters.commodity
}

const editSelected = item => {
  edit(item)
}


const submitForm = async () => {
  await store.dispatch('updateMtrcat', { id: id, mtrcat: data.value })

  const error = computed(() => store.getters.foError)

  if (error.value) {
    errorAlert.value = true
  } else {
    successAlert.value = true
    await dispatch()
    setTimeout(() => {
      successAlert.value = false
    }, 3000)
  }

}

const deleteItem = async item => {
  await store.dispatch('deleteMtrcat', item.id)
  await dispatch()
  router.push('/category')
}

const disabled = ref(true)
const dialog = ref(false)

const editEnabled = () => {
  disabled.value = false
}

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
}
</script>

<template>
  <div class="d-flex gap-4">
    <VCard
      v-if="expand"
      width="300"
    >
      <div class="searchable">
        <VCardText> 
          <div class="d-flex">
            <VTextField
              v-model="searchValue"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              variant="underlined"
              class="mb-4"
              @input="search"
            />
          </div>
          <div
            v-if="loading"
            class="preloader"
          >
            <div
              v-for="(item, index) in 6"
              :key="index"
            >
              <div class="header" />
              <div class="sub" />
            </div>
          </div>
          <div
            v-if="mtrcats.length > 0"
            class="wrapper scrollable"
          >
            <div
              v-for="(item, index) in mtrcats"
              :key="index"
            >
              <div class="d-flex mt-4">
                <VIcon
                  icon="mdi-store-outline" 
                  size="30"
                  class="mr-2"
                  color="primary"
                />  
                <div>
                  <div class="d-flex">
                    <div class="info">
                      <span class="font-weight-semibold me-2 mb-4">Category: {{ item.mtrCatCol }}</span>
                    </div>
                    <div class="icon">
                      <VBtn
                        icon="mdi-pencil"
                        size="x-small"
                        variant="tonal"
                        @click="editSelected(item)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <VDivider />
            </div>
          </div>
          <div
            v-else
            class="else"
          >
            <p>No Category Found</p>
          </div>
        </VCardText>
      </div>
    </VCard>
    <VCard
      class="d-flex gap-6"
      width="650"
    >
      <VCardText>
        <div class="">
          <VRow width="20%">
            <VCol cols="20">
              <VAlert
                v-model="successAlert"
                border="start"
                variant="tonal"
                closable
                close-label="Close Alert"
                type="success"
                title="Success!"
                text="Comodity details saved successfully"
              />
              <VAlert
                v-model="errorAlert"
                border="start"
                variant="tonal"
                closable
                close-label="Close Alert"
                type="error"
                title="Error!"
                text="Comodity details not saved successfully"
              />
              <!-- 👉 Form -->
              <VForm
                :disabled="disabled"
                :loading="loading"
                @submit.prevent="submitForm"
              >
                <VCardText>
                  <div class="icons d-flex justify-end">
                    <VIcon
                      size="24"
                      icon="mdi-pencil-outline"
                      class="me-6"
                      @click="editEnabled"
                    />
                    <VDialog
                      v-model="dialog"
                      persistent
                      width="auto"
                    >
                      <template #activator="{ props }">
                        <VIcon
                          size="24"
                          icon="mdi-delete-outline"
                          class="me-6"
                          v-bind="props"
                          color="error"
                        />
                      </template>
                      <VCard>
                        <VCardTitle class="headline">
                          Delete Category
                        </VCardTitle>
                        <VCardText>
                          Are you sure you want to delete this Category?
                        </VCardText>
                        <VCardActions>
                          <VSpacer />
                          <VBtn
                            color="green-darken-1"
                            variant="text"
                            @click="dialog = false"
                          >
                            No
                          </VBtn>
                          <VBtn
                            color="error"
                            variant="text"
                            @click="deleteItem(data)"
                          >
                            Yes
                          </VBtn>
                        </VCardActions>
                      </VCard>
                    </VDialog>
                  </div>
                  <div class="d-flex">
                    <VIcon
                      size="70"
                      icon="mdi-store-outline"
                      class="me-6"  
                    />
                    <div>
                      <h3 class="font-weight-semibold mb-2">
                        Comodity Category Details
                      </h3>
                      <p class="mb-2">
                        Please fill in the form below to edit selected comodity category.
                      </p>
                    </div>
                  </div>
                </VCardText>
                <VContainer>
                  <VRow>
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <VTextField
                        v-model="data.mtrCatCol"
                        label="Category Name"
                        required
                        :loading="loading"
                        :rules="[isEmptyValidator]"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="10"
                      class="d-flex flex-wrap gap-4"
                    >
                      <VBtn @click.prevent="submitForm">
                        Save
                      </VBtn>
                    </VCol>
                  </VRow>
                </VContainer> 
              </VForm>
            </VCol>
          </VRow> 
        </div>  
      </VCardText>  
      <div class="d-flex justify-end mt-4">
        <VIcon 
          color="primary"
          :icon="expand ? 'mdi-arrow-expand' :'mdi-arrow-collapse'"
          @click="expand=!expand"
        />
      </div> 
    </VCard>
  </div>
</template>

<style scoped>
.search {
  border-radius: 4px;
  border-block-end: 1px solid #e0e0e0;
  font-size: 14px;
  inline-size: 100%;
  margin-block-start: 10px;
}

.search:focus {
  outline: none;
}

.scrollable {
  block-size: 400px;
  inline-size: 250px;
  overflow-y: scroll;
  padding-inline-end: 15px;
}

.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  block-size: 70px;
}

.preloader .header {
  background-color: #e0e0e0;
  block-size: 6%;
  inline-size: 65%;
}

.preloader .sub {
  background-color: #e0e0e0;
  block-size: 6%;
  inline-size: 60%;
  margin-block-start: 5px;
}

@keyframes loading {
  0% {
    opacity: 0.2;
  }

  20% {
    opacity: 0.4;
  }

  40% {
    opacity: 0.6;
  }

  60% {
    opacity: 0.8;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
