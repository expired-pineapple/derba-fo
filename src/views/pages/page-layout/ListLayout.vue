<template>
  <VCard>
    <VCardTitle>{{ props.header }}</VCardTitle>
    <p class="text-caption mx-4">
      {{ props.subheader }}
    </p>
    <div class="d-flex">
      <VBtn
        variant="outlined"
        color="primary"
        height="30"
        class="ml-4 mt-3 mb-2"
      >
        <VIcon>mdi-plus</VIcon>
  
        <span
          class="d-none d-sm-block"
          @click="props.button.onClick"
        >{{ props.button.text }}</span>
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
    <EasyDataTable
      :headers="props.tableHeader.headers"
      :items="props.tableHeader.items"
      :search-field="searchField"
      :search-value="searchValue"
      @click-row="editDriver"
    >
      <template #empty-message>
        <div class="text-center">
          <p>No Data found.</p>
        </div>
      </template>
    </EasyDataTable>
  </VCard>
</template>

<script lang="ts" setup>
import router from "@/router"
import { ref } from "vue"

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  subheader: {
    type: String,
    required: false,
  },
  button: {
    type: Object,
    required: true,
  },
  tableHeader: {
    type: Object,
    required: true,
  },
})

const searchField = ref("")
const searchValue = ref("")
</script>

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
</style>
