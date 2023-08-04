<!-- eslint-disable vue/attribute-hyphenation -->

<script setup>
import { ref, onMounted } from "vue"
import Form from '@/views/pages/driver/FormView.vue'


import { useRoute } from 'vue-router'
import router from "@/router"
   
const route = useRoute()
const activeTab = ref(route.params.tab)

const items = [
  {
    "id": 1,
    "fullName": "John Doe",
    "dmc_ID": "123456",
    "department": "Marketing",
    "phoneNumber": "555-1234",
    "residenceCity": "New York",
    "job_title": "Marketing Manager",
    "tin": "123-456-789",
    "email": "johndoe@example.com",
    "DOB": "1985-07-20",
    "drvEmplStartDate": "2010-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 2,
    "fullName": "Jane Smith",
    "dmc_ID": "234567",
    "department": "Sales",
    "phoneNumber": "555-5678",
    "residenceCity": "Los Angeles",
    "job_title": "Sales Representative",
    "tin": "234-567-890",
    "email": "janesmith@example.com",
    "DOB": "1990-05-12",
    "drvEmplStartDate": "2015-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 3,
    "fullName": "Bob Johnson",
    "dmc_ID": "345678",
    "department": "Engineering",
    "phoneNumber": "555-9012",
    "residenceCity": "San Francisco",
    "job_title": "Software Engineer",
    "tin": "345-678-901",
    "email": "bobjohnson@example.com",
    "DOB": "1988-02-28",
    "drvEmplStartDate": "2012-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 4,
    "fullName": "Sarah Lee",
    "dmc_ID": "456789",
    "department": "Human Resources",
    "phoneNumber": "555-3456",
    "residenceCity": "Chicago",
    "job_title": "HR Manager",
    "tin": "456-789-012",
    "email": "sarahlee@example.com",
    "DOB": "1983-11-15",
    "drvEmplStartDate": "2008-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 5,
    "fullName": "David Kim",
    "dmc_ID": "567890",
    "department": "Finance",
    "phoneNumber": "555-6789",
    "residenceCity": "Houston",
    "job_title": "Financial Analyst",
    "tin": "567-890-123",
    "email": "davidkim@example.com",
    "DOB": "1995-09-01",
    "drvEmplStartDate": "2020-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 6,
    "fullName": "Emily Chen",
    "dmc_ID": "678901",
    "department": "Marketing",
    "phoneNumber": "555-2345",
    "residenceCity": "Seattle",
    "job_title": "Marketing Coordinator",
    "tin": "678-901-234",
    "email": "emilychen@example.com",
    "DOB": "1992-04-08",
    "drvEmplStartDate": "2019-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 7,
    "fullName": "Kevin Lee",
    "dmc_ID": "789012",
    "department": "Engineering",
    "phoneNumber": "555-5678",
    "residenceCity": "Boston",
    "job_title": "Software Engineer",
    "tin": "789-012-345",
    "email": "kevinlee@example.com",
    "DOB": "1993-12-31",
    "drvEmplStartDate": "2018-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 8,
    "fullName": "Megan Johnson",
    "dmc_ID": "890123",
    "department": "Human Resources",
    "phoneNumber": "555-9012",
    "residenceCity": "Miami",
    "job_title": "HR Specialist",
    "tin": "890-123-456",
    "email": "meganjohnson@example.com",
    "DOB": "1987-06-25",
    "drvEmplStartDate": "2013-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 9,
    "fullName": "Alex Lee",
    "dmc_ID": "901234",
    "department": "Finance",
    "phoneNumber": "555-3456",
    "residenceCity": "Atlanta",
    "job_title": "Financial Manager",
    "tin": "901-234-567",
    "email": "alexlee@example.com",
    "DOB": "1980-01-15",
    "drvEmplStartDate": "2005-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  {
    "id": 10,
    "fullName": "Rachel Kim",
    "dmc_ID": "012345",
    "department": "Sales",
    "phoneNumber": "555-6789",
    "residenceCity": "Dallas",
    "job_title": "Sales Manager",
    "tin": "012-345-678",
    "email": "rachelkim@example.com",
    "DOB": "1978-09-30",
    "drvEmplStartDate": "2002-01-01",
    "drvEmplEndDate": "",
    "isActive": true,
  },
  

]



const expand=ref(false)
const search = ref('')
const filteredItems = ref(items)

const filterItems = () => {
  if (!search.value) {
    filteredItems.value = items
  }
  filteredItems.value = items.filter(item => {
    return item.driver_name.toLowerCase().includes(search.value.toLowerCase())
  })
  
  return filteredItems 
}  


const onSearch = () => {
  filterItems()
}

const model = items[0]

const editSelected = item => {
  router.push(`/driver-edit/${item.id}`)
}
</script>

<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex mb-4">
      <VIcon
        class="text-primary"
        @click="router.go(-1)"
      >
        mdi-arrow-left
      </VIcon>
    </div>
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
              :title="item.fullName"
              :subtitle="item.dmc_ID"
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
            class="mr-4"
          >
            <VIcon size="100">
              mdi-account-circle-outline
            </VIcon>
          </VAvatar>
          <div class="driver-info mt-6">
            <p class="mb-0">
              <strong class="text-primary">Driver Name:</strong>
              John Doe
            </p>
            <p>
              <strong class="text-primary">Driver DMC ID:</strong>
              123456789
            </p>
          </div>  
          <div class="form" />
        </div>
      </VCardItem>
      <VDivider
        color="primary"
        class="mb-4"
      />
      <VCardText>
        <Form v-bind="model" />
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


