<script lang="ts" setup>
import router from "@/router"
import { computed, ref } from "vue"
import { useStore } from "vuex"

const props = defineProps({
  header: {
    type: String,
    required: false,
  },
  subheader: {
    type: String,
    required: false,
  },
  button: {
    type: Object,
    required: false,
  },
  tableHeader: {
    type: Object,
    required: true,
  },
  buttonVisible: {
    type: Boolean,
    required: false,
    default: true,
  },
  searchVisible: {
    type: Boolean,
    required: false,
    default: true,
  },
  rows: {
    type: Number,
    required: false,
    default: 20,
  },
  clickedRow: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
  handleDownloadPDF: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  operation: {
    type: Object,
    required: true,
  },
})

const searchField = ref("")
const searchValue = ref("")

const store = useStore()
</script>

<template>
  <VCard>
    <VCardTitle v-if="props.header">
      {{ props.header }}
    </VCardTitle>
    <p
      v-if="props.subheader"
      class="text-caption mx-4"
    >
      {{ props.subheader }}
    </p>    
    <div 
      v-if="buttonVisible"
      class="d-flex"
    >
      <VBtn
        v-if="props.buttonVisible"
        variant="outlined"
        color="primary"
        height="30"
        class="ml-4 mt-3 mb-2"
        :to="props.button.to"
      >
        <VIcon>mdi-plus</VIcon>
  
        <span class="d-none d-sm-block">{{ props.button.text }}</span>
      </VBtn>
      <div
        class="d-flex"
        style="margin: 0 10px 5px 30rem;"
      >
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
              v-for="(item, i) in props.tableHeader.headers"
              :key="i"
              v-model="searchField"
              :value="item.value"
              @click="searchField = item.value"
            >
              <VListItemTitle class="text-center text-caption">
                {{ item.text }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-space-between"
    >
      <VTextField
        v-model="searchValue"
        density="underlined"
        variant="solo"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        :placeholder="placeholder"
      />
      <div
        v-if="props.handleDownloadPDF"
        class="download"
      >
        <VBtn
          variant="outlined"
          color="primary"
          height="30"
          class="ml-4 mt-3 mb-2 mr-4"
          @click="props.handleDownloadPDF"
        >
          <VIcon>mdi-download</VIcon>
          Download Report
        </VBtn>
      </div>
    </div>
    <EasyDataTable
      table-class-name="customize-table"
      :rows-per-page="props.rows"
      :headers="props.tableHeader.headers"
      :items="props.tableHeader.items"
      :loading="props.loading"
      :search-field="searchField"
      :search-value="searchValue"
      @click-row="props.clickedRow"
    >
      <template #loading>
        <p>Loading Data</p>
      </template>
      <template #item-operation="item"> 
        <div class="cursor-pointer">
          <VIcon
            icon="mdi-delete-outline"
            color="error"
            @click="props.operation(item)"
          />
        </div>
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
