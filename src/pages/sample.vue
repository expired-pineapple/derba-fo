<template>
  <DetailLayout v-bind="props">
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
              <EmergencyContact />
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
              <Passport />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
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
  </DetailLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"

import router from "@/router"
import DetailLayout from "@/views/pages/page-layout/DetailLayout.vue"
import Form from '@/views/pages/driver/FormView.vue'
import EmergencyContact from '@/views/pages/driver/EmergencyContact.vue'
import Passport from '@/views/pages/driver/Passport.vue'
import Licence from '@/views/pages/driver/Licence.vue'
import DriverLeave from '@/views/pages/driver/Lists/DriverLeave.vue'
import Truck from '@/views/pages/driver/Lists/Truck.vue'
import DjiboutiPass from '@/views/pages/driver/Lists/DjiboutiPass.vue'


const header = {
  heading: "header",
  text: "text",
}

const subheader  = {
  heading: "header",
  text: "text",
}

const tabItems = [
  { title: 'Driver Info', icon: 'mdi-account-outline', tab: 'info' },
  { title: 'Driver Leave', icon: 'mdi-account-minus-outline', tab: 'drvLeave' },
  { title: 'Assigned Truck', icon: 'mdi-truck-outline', tab: 'truck' },
  { title: 'Djibouti Pass', icon: 'mdi-card-account-details-outline', tab: 'djiboutPass' },
]


const items = [
  {
    "id": 1,
    "fullName": "Mulugeta Bekele",
    "dmc_ID": "123456",
    "department": "Marketing",
    "phoneNumber": "555-1234",
    "residenceCity": "New York",
    "job_title": "Marketing Manager",
    "tin": "123-456-789",
    "email": "mulugetaBekele@example.com",
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
    "isActive": "true",
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


const expand=ref(true)
const filteredItems = ref(items)
const editEmergencyContact = ref(false)





const props = {
  icon: "mdi-pencil",
  header: header,
  subheader: subheader,
  tabItems: tabItems,
  items: items,
  titleField: "fullName",
  subtitleField: "dmc_ID",
}
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
