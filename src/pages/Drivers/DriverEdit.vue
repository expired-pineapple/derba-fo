<!-- eslint-disable vue/attribute-hyphenation -->

<script setup>
import { ref, onMounted } from "vue"
import { useStore } from 'vuex'
import Form from '@/views/pages/driver/FormView.vue'
import EmergencyContact from '@/views/pages/driver/EmergencyContact.vue'
import Passport from '@/views/pages/driver/Passport.vue'
import Licence from '@/views/pages/driver/Licence.vue'
import DriverLeave from '@/views/pages/driver/DriverLeave.vue'
import Truck from '@/views/pages/driver/Truck.vue'
import DjiboutiPass from '@/views/pages/driver/DjiboutiPass.vue'

import { useRoute } from 'vue-router'
import router from "@/router"
   
const route = useRoute()
const activeTab = ref(route.params.tab)

const { fetchDrivers } = mapActions('driver', ['fetchDriver'])

const store = useStore()

const id = route.params.id

const loading = ref(false)

const expand=ref(true)
const search = ref('')

const fetchDriver = store.dispatch('fetchDriver', id)

onMounted(async () => {
  try {
    loading.value = true
    await store.dispatch("fetchDriver")
  } catch (err) {
  }
  finally{
    loading.value = !loading.value  
  }
})

const driver = store.getters.driver

const filteredItems = ref(null)

const editEmergencyContact = ref(false)

const filterItems = () => {
  if (!search.value) {
    filteredItems.value = driver
  }
  filteredItems.value = items.filter(item => {
    return item.driver_name.toLowerCase().includes(search.value.toLowerCase())
  })
  
  return filteredItems 
}


const onSearch = () => {
  filterItems()
}


const tabItems = [
  { title: 'Driver Info', icon: 'mdi-account-outline', tab: 'info' },
  { title: 'Emergency Contact', icon: 'mdi-card-account-phone-outline', tab: 'emergency' },
  { title: 'Passport', icon: 'mdi-card-account-details-outline', tab: 'passport' },
  { title: 'Licence', icon: 'mdi-card-account-details-outline', tab: 'licence' },
  { title: 'Driver Leave', icon: 'mdi-account-minus-outline', tab: 'drvLeave' },
  { title: 'Assigned Truck', icon: 'mdi-truck-outline', tab: 'truck' },
  { title: 'Djibouti Pass', icon: 'mdi-card-account-details-outline', tab: 'djiboutPass' },
]

const editDriver = async item => {
  await router.push(`/driver-edit/${item.id}`)
  await store.dispatch("fetchDriver", item.id)
}

const editSelected = item => {
  editDriver(item) // Call editDriver function
}
</script>

<template>
  <div class="">
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabItems"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        <span class="text-caption">
          {{ item.title }}
        </span>
      </VTab>
    </VTabs>
  </div>
  <div class="d-flex">
    <VCard
      v-if="!expand"
      width="250"
      class="mr-4 driver-list"
    >
      <VCardItem>
        <div class="d-flex">
          <VIcon class="text-primary mt-3">
            mdi-magnify
          </VIcon>
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            class="search"
            @input="onSearch"
          >
        </div>
      </VCardItem>
      <VDivider
        color="primary"
        class="mb-4"
      />
      
      <VVirtualScroll
        :items="filteredItems"
        height="700"
        item-height="48"
      >
        <template #default="{ item }">
          <VList>
            <VListItem
              :title="item.driver_name"
              :subtitle="item.driver_dmc_id "
            >
              <template #prepend>
                <VIcon>
                  mdi-account-circle-outline
                </VIcon>
              </template>
              <template #append>
                <VBtn
                  icon="mdi-pencil"
                  size="x-small"
                  variant="tonal"
                  @click="editSelected(item)"
                />
              </template>
            </VListItem>
          </VList>
        </template>
      </VVirtualScroll>
    </VCard>
    <VCard :width="expand ? 1000 : 700">
      <VCardItem>
        <div class="d-flex justify-end">
          <VIcon 
            color="primary"
            :icon="expand ? 'mdi-arrow-expand' :'mdi-arrow-collapse'"
            @click="expand=!expand"
          />
        </div>
        <div class="d-flex">
          <VAvatar 
            size="100"
            class="gap-4"
          >
            <VIcon size="100">
              mdi-account-circle-outline
            </VIcon>
          </VAvatar>
          <div class="driver-info mt-6">
            <p class="mb-0">
              <strong class="text-primary">Driver Name:</strong>
              {{ model.driver_name }}
            </p>
            <p>
              <strong class="text-primary">Driver DMC ID:</strong>
              {{ model.driver_dmc_id }}
            </p>
          </div>  
          <div class="form" />
        </div>
      </VCardItem>
      <VDivider
        color="primary"
        class="mb-4"
      />
      <VWindow v-model="activeTab">
        <!-- Driver -->
        <VWindowItem value="info">
          <VCardText>
            <Form v-bind="model" />
          </VCardText>
        </VWindowItem>
        <!-- Emergency Contact -->
        <VWindowItem value="emergency">
          <EmergencyContact />
        </VWindowItem>
        <!-- Passport -->
        <VWindowItem value="passport">
          <Passport />
        </VWindowItem>
        <!-- Licence -->
        <VWindowItem value="licence">
          <Licence />
        </VWindowItem>
        <!-- Driver Leave -->
        <VWindowItem value="drvLeave">
          <DriverLeave />
        </VWindowItem>
        <!-- Truck -->
        <VWindowItem value="truck">
          <Truck />
        </VWindowItem>
        <!-- Djibouti Pass -->
        <VWindowItem value="djiboutPass">
          <DjiboutiPass />
        </VWindowItem>
      </VWindow>
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
</style>


