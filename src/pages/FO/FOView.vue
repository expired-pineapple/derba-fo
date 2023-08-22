<script lang="ts" setup>
import router from "@/router"
import { onBeforeMount, ref } from "vue"
import { useStore } from "vuex"

const headers = [
  { text: 'Shipment Code', value: 'ShipmentCode', sortable: true },
  { text: 'FO No', value: 'foNo' },
  { text: 'Customer', value: 'CustomerID.cmrName' },
  { text: 'Material', value: 'MtrId.mtrName' },
  { text: 'Trip', value: 'TrpId.trpRouteName' },
  { text: 'FO Date', value: 'foDate', sortable: true },
  { text: 'FO Time', value: 'foTime' },
  { text: 'Open Km', value: 'foOpenKm' },
  { text: 'Return Date', value: 'foRtnDate' },
  { text: 'Return Time', value: 'foRtnTime' },
  { text: 'Close Km', value: 'foCloseKm' },
  { text: 'Meter Quantity', value: 'foMtrQuantity' },
]

const searchField = ref("")
const searchValue = ref("")
const itemsSelected = ref([])

const store = useStore()

const items = ref([])
const loading = ref(false)

const showButton = ref(false)

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchFos")
    items.value = store.getters.fos
  } catch (err) {
    console.error("Error dispatching fetch action:", err)
  } finally {
    loading.value = false
  }
})

const clickedRow = item => {
  router.push(`/shipment/${item.id}`)
}

const fuel = () => {
  if (itemsSelected.value.length === 0) {
    alert("Please select a FO")
  } else if(itemsSelected.value.length > 1) {
    alert("Please select only one FO")
  } else if(itemsSelected.value[0].foFuelLock) {
    alert("Fuel already locked")
  } else {
    router.push(`/fuel/${itemsSelected.value[0].id}`)
  }
}

const perdiuem = () => {
  if (itemsSelected.value.length === 0) {
    alert("Please select a FO")
  } else if(itemsSelected.value.length > 1) {
    alert("Please select only one FO")
  } else {
    router.push(`/perdiuem/${itemsSelected.value[0].id}`)
  }
}

const advance = () => {
  if (itemsSelected.value.length === 0) {
    alert("Please select a FO")
  } else if(itemsSelected.value.length > 1) {
    alert("Please select only one FO")
  } else {
    router.push(`/advance/${itemsSelected.value[0].id}`)
  }
}

const settlement = () => {
  if (itemsSelected.value.length === 0) {
    alert("Please select a FO")
  } else if(itemsSelected.value.length > 1) {
    alert("Please select only one FO")
  } else {
    router.push(`/settlement/${itemsSelected.value[0].id}`)
  }
}

const deleteItem = async() => {
  try{
    await store.dispatch("deleteFO", itemsSelected.value)
  } catch (err) {
    console.error("Error dispatching delete action:", err)
  } finally {
    await store.dispatch("fetchFos")
  }
}

const dialog = ref(false) 
</script>

<template>
  <VCard :loading="loading">
    <div class="d-flex justify-space-between">
      <div class="ml-4 mt-4">
        <VCardTitle>
          Freight Order List
        </VCardTitle>
        <p class="text-caption mx-4">
          These are all the Freight Orders registered in the system.
        </p>
      </div>
    </div>
    <div class="d-flex ml-4">
      <div class="d-flex">
        <!--
          <VMenu
          transition="slide-x-transition"
          class="mr-4"
          >
          <template #activator="{ props }">
          <VBtn
          icon="mdi-filter"
          v-bind="props"
          color="primary"
          variant="outlined"
          size="4"
          class="mt-3 mr-3"
          />
          </template>

          <VList width="100">
          <VListItem
          v-for="(item, i) in headers"
          :key="i"
          :value="item.value"
          @click="searchField = item.value"
          >
          <VListItemTitle class="text-center text-caption">
          {{ item.text }}
          </VListItemTitle>
          </VListItem>
          </VList>
          </VMenu> 
        -->
        <div class="search mr-4">
          <VIcon
            size="23"
            color="primary"
            class="mt-1"
          >
            mdi-magnify
          </VIcon>
          <input
            v-model="searchValue"
            class="search-field"
            type="text"
            placeholder="Search"
          >
        </div>
      </div>
      <div
        v-if="itemsSelected.length > 0"
        class="d-flex"
        style="margin: 0 10px 5px 10rem;"
      >
        <VBtn
          variant="outlined"
          color="primary" 
          height="30"
          width="120"
          class="ml-4 mt-3 mb-2"
          append-icon="mdi-fuel"
          text="Fuel"
          style="font-size: 0.7rem;"
          @click="fuel"
        />
        <VBtn
          variant="outlined"
          color="primary" 
          height="30"
          width="120"  
          class="ml-4 mt-3 mb-2"
          append-icon="mdi-cash"
          text="Perdiuem"
          style="font-size: 0.7rem;"
          @click="perdiuem"
        />
        <VBtn
          variant="outlined"
          color="primary" 
          height="30"
          width="120"
          class="ml-4 mt-3 mb-2"
          append-icon="mdi-cash"
          text="Advance"
          style="font-size: 0.7rem;"
          @click="advance"
        />
        <VBtn
          variant="outlined"
          color="primary" 
          height="30"
          width="120"
          class="ml-4 mt-3 mb-2"
          append-icon="mdi-cash-refund"
          text="Settlement"
          style="font-size: 0.7rem;"
          @click="settlement"
        />
        <VDialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <template #activator="{ props }">
            <VIcon
              size="20"
              icon="mdi-delete-outline"
              class="ml-4 mt-4"
              v-bind="props"
              color="error"
            />
          </template>
          <VCard>
            <VCardTitle class="headline">
              Delete Freight Order
            </VCardTitle>
            <VCardText>
              Are you sure you want to {{ itemsSelected.length }} delete Freight Order(s)?
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
                @click="deleteItem"
              >
                Yes
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
      </div>
      <div
        v-else
        style="margin: 0 10px 5px 35rem;"
      >
        <VBtn
          variant="outlined"
          color="primary"
          height="30"
          class="mt-3 mb-2 mr-4"
          to="/register-fo"
        >
          <VIcon>mdi-plus</VIcon>
    
          <span class="d-none d-sm-block">Register FO</span>
        </VBtn>
      </div>
    </div>
    <EasyDataTable
      v-model:items-selected="itemsSelected"
      table-class-name="customize-table"
      :rows-per-page="10"
      :headers="headers"
      :items="items"
      :loading="loading"
      :search-field="searchField"
      :search-value="searchValue"
      @click-row="clickedRow"
    >
      <template #loading>
        <p>Loading Data</p>
      </template>
      <template #empty-message>
        <div class="text-center">
          <p>No Data found.</p>
        </div>
      </template>
    </EasyDataTable>
  </VCard>
</template>

<style scoped>
.search {
  padding: 5px;
  border-block-end: 1px solid #0f8e3d;
  inline-size: 100%;
  margin-block-end: 10px;
}

.search-field {
  padding: 5px;
  border-block-end: none;
  font-size: 0.8rem;
  inline-size: 60%;
}

.search-field:focus {
  outline: none;
}

.customize-table {
  --easy-table-header-font-color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  --easy-table-header-background-color: rgba(var(--v-theme-on-table), var(--v-hover-opacity)) !important;
  --easy-table-body-even-row-font-color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  --easy-table-body-even-row-background-color: rgb(var(--v-theme-surface));
  --easy-table-body-row-font-color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  --easy-table-body-row-background-color: rgb(var(--v-theme-surface)) !important;
  --easy-table-body-row-hover-font-color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  --easy-table-footer-background-color: background-color: rgba(var(--v-theme-on-background), var(--v-hover-opacity)) !important;
  --easy-table-footer-font-color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  --easy-table-scrollbar-track-color: background-color: rgba(var(--v-theme-on-background), var(--v-hover-opacity)) !important;
  --easy-table-loading-mask-background-color: #ffff;
  --easy-table-body-row-hover-background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}
</style>
