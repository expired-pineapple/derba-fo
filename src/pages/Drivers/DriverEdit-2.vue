<!-- eslint-disable vue/attribute-hyphenation -->
<script setup>
import { ref, onMounted, onBeforeMount, computed } from "vue"
import Form from '@/views/pages/driver/FormView.vue'
import EmergencyContact from '@/views/pages/driver/EmergencyContact.vue'
import Passport from '@/views/pages/driver/Passport.vue'
import Licence from '@/views/pages/driver/Licence.vue'
import DriverLeave from '@/views/pages/driver/Lists/DriverLeave.vue'
import Truck from '@/views/pages/driver/Lists/Truck.vue'
import DjiboutiPass from '@/views/pages/driver/Lists/DjiboutiPass.vue'

import { useRoute } from 'vue-router'
import { mapActions, useStore } from 'vuex'
import router from "@/router"

const store  = useStore()
const route = useRoute()

const { fetchDrivers } = mapActions('driverModule', ['fetchDrivers', 'fetchDriver', 'fetchEmergencyContact', 'fetchDriverLicence', 'fetchDriverPassport'])
const { fetchDriverAssignedTrucks } = mapActions('vehicleModule', ['fetchDriverAssignedTrucks'])

const dispatch = async () =>{
  console.log("Here disp")
  await store.dispatch("fetchDriver", route.params.id)
  await store.dispatch("fetchDriverPassport", route.params.id)
  await store.dispatch("fetchDriverLicence", route.params.id)
  await store.dispatch("fetchEmergencyContact", route.params.id)
  await store.dispatch('fetchDriverLeaveLog', route.params.id)
  await store.dispatch('fetchDriverAssignedTrucks', route.params.id)
  await store.dispatch('fetchDjiboutiPass', route.params.id)
}

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchDrivers")
    await dispatch()
  } catch (err) {
    console.error('Error dispatching fetchDrivers action:', err)
  }
})

const items = computed(() => store.getters.drivers)
const model = computed(() => store.getters.driver)
const emergencyContact = computed(() => store.getters.emergencyContact)
const drvPassport = computed(() => store.getters.driverPassport)
const licence  = computed(() => store.getters.driverLicence)
const driverLeave  = computed(() => store.getters.driverLeaveLog)
const truck = computed(() => store.getters.driverAssignedTrucks)
const djiboutPass = computed(() => store.getters.djiboutiPass)

console.log(truck.value, "driverAssignedTrucks")


const emergencyProps = {
  emergencyContact,
}

const drvPass = {
  drvPassport,
}

const leaveProps = {
  driverLeave,
}

const truckProps = {
  truck,
}

const djiboutPassProps = {
  djiboutPass,
}


console.log(items.value)
console.log(model.value)

const activeTab = ref(route.params.tab)

const expand=ref(true)
const search = ref('')
const filteredItems = ref(items)
const editEmergencyContact = ref(false)

const filterItems = () => {
  if (!search.value) {
    filteredItems.value = items
  }
  filteredItems.value = items.value.filter(item => {
    return item.driver_name.toLowerCase().includes(search.value.toLowerCase())
  })
  
  return filteredItems 
}


const onSearch = () => {
  filterItems()
}


const tabItems = [
  { title: 'Driver Info', icon: 'mdi-account-outline', tab: 'info' },
  { title: 'Driver Leave', icon: 'mdi-account-minus-outline', tab: 'drvLeave' },
  { title: 'Assigned Truck', icon: 'mdi-truck-outline', tab: 'truck' },
  { title: 'Djibouti Pass', icon: 'mdi-card-account-details-outline', tab: 'djiboutPass' },
]


const editDriver = async item => {
  await router.push(`/driver-edit/${item.id}`)
  await dispatch()
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
          size="24"
          start
          :icon="item.icon"
        />
        <span class="">
          {{ item.title }}
        </span>
      </VTab>
    </VTabs>
  </div>
  <div class="d-flex">
    <VCard
      v-if="expand"
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
              :subtitle="item.driver_dmc_id"
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
    <VCard :width="expand ? 700 : 1000">
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
        <!-- Info -->
        <VWindowItem value="info">
          <VExpansionPanels variant="accordion">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <VIcon left>
                  mdi-information-outline
                </VIcon>
                Basic Information
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VCardText>
                  <Form v-bind="model" />
                </VCardText>
              </VExpansionPanelText>
            </VExpansionPanel>

            <!-- Emergency Contact -->
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <VIcon left>
                  mdi-alert-outline
                </VIcon>
                Emergency Contact
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <EmergencyContact v-bind="emergencyProps" />
              </VExpansionPanelText>
            </VExpansionPanel>

            <!-- Passport -->
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <VIcon left>
                  mdi-passport
                </VIcon>
                Passport
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Passport v-bind="drvPass" />
              </VExpansionPanelText>
            </VExpansionPanel>
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <VIcon left>
                  mdi-license 
                </VIcon>
                Licence
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Licence />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VWindowItem>
        <!-- Driver Leave -->
        <VWindowItem value="drvLeave">
          <DriverLeave v-bind="leaveProps" />
        </VWindowItem>
        <!-- Truck -->
        <VWindowItem value="truck">
          <Truck v-bind="truckProps" />
        </VWindowItem>
        <!-- Djibouti Pass -->
        <VWindowItem value="djiboutPass">
          <DjiboutiPass v-bind="djiboutPassProps" />
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


