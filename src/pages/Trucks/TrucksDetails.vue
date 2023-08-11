<!-- eslint-disable vue/attribute-hyphenation -->

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from 'vue-router'
import { mapActions, useStore } from 'vuex'
import router from "@/router"
   
const route = useRoute()
const activeTab = ref(route.params.tab)

const { fetchDrivers } = mapActions('driver', ['fetchDrivers'])

const store = useStore()

const loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true
    await store.dispatch("fetchDrivers")
  } catch (err) {
    console.error('Error dispatching fetchDrivers action:', err)
  }
  finally{
    loading.value = !loading.value  
  }
})

const items = computed(() => store.getters.drivers)



console.log(items.value)



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

const model = items.value[0]

const tabItems = [
  { title: 'Basic info', icon: 'mdi-information-outline', tab: 'info' },
  { title: 'Driver Leave', icon: 'mdi-account-minus-outline', tab: 'drvLeave' },
  { title: 'Assigned Truck', icon: 'mdi-truck-outline', tab: 'truck' },
  { title: 'Djibouti Pass', icon: 'mdi-card-account-details-outline', tab: 'djiboutPass' },
]


const editSelected = item => {
  router.push(`/driver-edit/${item.id}`)
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
              :title="item.driver"
              :subtitle="item.fleet_number"
            >
              <template #prepend>
                <VIcon>
                  mdi-truck-outline
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
              mdi-truck-outline
            </VIcon>
          </VAvatar>
          <div class="driver-info mt-6">
            <p class="mb-0">
              <strong class="text-primary">Driver Name:</strong>
            </p>
            <p>
              <strong class="text-primary">Fleet Number:</strong>
            </p>
          </div>  
          <div class="form" />
        </div>
      </VCardItem>
      <VDivider
        color="primary"
        class="mb-4"
      />
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


