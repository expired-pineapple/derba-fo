<!-- eslint-disable vue/attribute-hyphenation -->

<script setup>
import { ref, computed, watch, defineProps } from "vue"

const props = defineProps({
  hasTabs: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
  },
  header: {
    type: Object,
  },
  subheader: {
    type: Object,
  },
  tabItems: {
    type: Array,
    required: true,
  },
  titleField: {
    type: String,
    required: true,
  },
  subtitleField: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

const search = ref([])
const searchTerm = ref("")

const generateSearchArray = () => {
  if (Array.isArray(props.items)) {
    search.value = props.items.map(item => ({
      title: item[props.titleField] ?? "",
      subtitle: item[props.subtitleField] ?? "",
    }))
  } else {
    console.error("props.items is not an array")
  }
}

const filteredItems = computed(() => {
  if (!search.value || !searchTerm.value) {
    return search.value
  }

  const lowerCasedSearchTerm = searchTerm.value.toLowerCase()

  return search.value.filter(item => {
    const lowerCasedTitle = item.title.toLowerCase()
    const lowerCasedSubtitle = item.subtitle.toLowerCase()

    return lowerCasedTitle.includes(lowerCasedSearchTerm) || lowerCasedSubtitle.includes(lowerCasedSearchTerm)
  })
})

const filterItems = () => {
  return filteredItems.value
}

watch(
  () => [props.items, props.titleField, props.subtitleField],
  generateSearchArray,
  { immediate: true },
)

const route = useRoute()
const activeTab = ref(route.params.tab)

const expand = ref(true)
</script>

<template>
  <!-- Tabs -->
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in props.tabItems"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        <span class="text-caption">{{ item.title }}</span>
      </VTab>
    </VTabs>
  </div>

  <!-- Expanded and Collapsed Card -->
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
            v-model="searchTerm"
            type="text"
            placeholder="Search"
            class="search"
            @input="filterItems"
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
              :title="item.title"
              :subtitle="item.subtitle"
            >
              <template #prepend>
                <VIcon>{{ props.icon }}</VIcon>
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
            :icon="expand ? 'mdi-arrow-expand' : 'mdi-arrow-collapse'"
            @click="expand = !expand"
          />
        </div>
        <div class="d-flex">
          <VAvatar
            size="100"
            class="gap-4"
          >
            <VIcon size="100">
              {{ props.icon }}
            </VIcon>
          </VAvatar>
          <div class="driver-info mt-6">
            <p class="mb-0">
              <strong class="text-primary">{{ props.header.heading }}</strong>
              {{ props.header.text }}
            </p>
            <p>
              <strong class="text-primary">{{ props.subheader.heading }}</strong>
              {{ props.subheader.text }}
            </p>
          </div>
        </div>
      </VCardItem>
      <VDivider
        color="primary"
        class="mb-4"
      />
      <VCardText>
        <slot />
      </VCardText>
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


