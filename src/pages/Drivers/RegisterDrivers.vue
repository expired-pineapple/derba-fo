<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const formData = {
  accountData: {
    driver_name: "",
    phone: "",
    email: "",
    permanent_residence: "",
    driver_dmc_id: "",
    department: "",
    Job_title: "",
    employment_status: "",
    note_on_driver: "",
    is_active: "",
  },
  emergency_contact: {
    drvContactName: "",
    drvContactPhone: "",
    drvContactRelationship: "",
    drvContactAdress: "",
    drvContactActiveStatus: "",
  },
  licence: {
    drvLicenceNumber: "",
    drvLicenceAuthority: "",
    drvLicenceIssueDate: "",
    drvLicenceExpiryDate: "",
    drvLicenceActiveStatus: "",
  },
}

const formDataLocal = ref(structuredClone(formData))

const route = useRoute()

const activeTab = ref(route.params.tab)


// tabs
const tabs = [
  { title: 'Driver', icon: 'mdi-account-tie-outline', tab: 'Driver' },
  { title: 'Emergency Contact', icon: 'mdi-card-account-phone-outline', tab: 'emergency' },
  { title: 'Passport', icon: 'mdi-passport', tab: 'passport' },
  { title: 'Licence', icon: 'mdi-license', tab: 'licence' },
]

const nextTab = () => {
  const index = tabs.findIndex(tab => tab.tab === activeTab.value)
  if (index < tabs.length - 1) {
    activeTab.value = tabs[index + 1].tab
  }
}

const resetInfo = () => {
  formDataLocal.value = structuredClone(formData)
  
}

const submitForm = () => {
  console.log('submitting form')
}
</script>


<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Driver -->
      <VWindowItem value="Driver">
        <VRow>
          <VCol cols="12">
            <VCard title="Basic Information">
              <VDivider />

              <VCardText>
                <!-- 👉 Form -->
                <VForm class="">
                  <VRow>
                    <!-- 👉 Full Name -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.accountData.driver_name"
                        label="Full Name"
                        placeholder="John Doe"
                        required
                      />
                    </VCol>
  
                    <!-- 👉 Email -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="formDataLocal.accountData.email"
                        label="E-mail"
                        type="email"
                        placeholder="johnDoe@example.com"
                      />
                    </VCol>
  
                    <!-- 👉 Permanent Residence -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="formDataLocal.accountData.permanent_residence"
                        label="Permanent Residence"
                        placeholder="Addis Ababa, Ethiopia"
                      />
                    </VCol>
  
                    <!-- 👉 Phone -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="formDataLocal.accountData.phone"
                        label="Phone Number"
                        placeholder="+251 912 3456 78"
                      />
                    </VCol>
  
                    <!-- 👉 driver_dmc_id -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="formDataLocal.accountData.driver_dmc_id"
                        label="Driver DMC ID"
                        placeholder="D01234"
                      />
                    </VCol>
  
                    <!-- 👉 department -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="formDataLocal.accountData.department"
                        label="Department"
                        placeholder="Logistics"
                      />
                    </VCol>
  
                    <!-- 👉 Job_title -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="formDataLocal.accountData.Job_title"
                        label="Job Title"
                        placeholder="Driver"
                      />
                    </VCol>
  
                    <!-- 👉 employment_status -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSelect
                        v-model="formDataLocal.accountData.employment_status"
                        label="Employment Status"
                        :items="['Active', 'Inactive', 'On leave']"
                      />
                    </VCol>
  
                    <!-- 👉   note_on_driver -->
                    <VCol
                      cols="12"
                      md="12"
                    >
                      <VTextarea
                        v-model="formDataLocal.accountData.note_on_driver"
                        label="Note On Driver"
                      />
                    </VCol>
              
                    <!-- 👉 Form Actions -->
                    <VCol
                      cols="12"
                      class="d-flex flex-wrap gap-4"
                    >
                      <VBtn
                        color="primary gap-4"
                        @click="nextTab"
                      >
                        Next
                      </VBtn>

                      <VBtn
                        color="secondary"
                        variant="tonal"
                        type="reset"
                        @click.prevent="resetForm"
                      >
                        Reset
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>

      <!-- Emergency Contact -->
      <VWindowItem value="emergency">
        <VRow>
          <VCol cols="12">
            <VCard title="Emergency Contact">
              <VDivider />

              <VCardText>
                <!-- 👉 Form -->
                <VForm class="">
                  <VRow>
                    <!-- 👉 Full Name -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.emergency_contact.drvContactName "
                        label="Contact Name "
                        placeholder="John Doe"
                        required
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.emergency_contact.drvContactPhone"
                        label="Contact Phone"
                        placeholder="+251 912 3456 78"
                        required
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.emergency_contact.drvContactRelatinship"
                        label="Contact Relationship"
                        placeholder="Sister"
                        required
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.emergency_contact.drvContactAdress"
                        label="Contact Adress"
                        placeholder="Addis Ababa, Ethiopia"
                        required
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VSwitch
                        v-model="formDataLocal.emergency_contact.drvContactActiveStatus"
                        label="Contact Active Status"
                      />
                    </VCol>
                    <!-- 👉 Form Actions -->
                    <VCol
                      cols="12"
                      class="d-flex flex-wrap gap-4"
                    >
                      <VBtn
                        v-if="activeTab !== 'licence'"
                        color="primary gap-4"
                        @click="nextTab"
                      >
                        Next
                      </VBtn>
                  
                      <VBtn
                        color="secondary"
                        variant="tonal"
                        type="reset"
                        @click.prevent="resetForm"
                      >
                        Reset
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </vcardtext>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>

      <!-- Licence -->
      <VWindowItem value="licence">
        <VRow>
          <VCol cols="12">
            <VAlert
              v-model="successAlert"
              border="start"
              variant="tonal"
              closable
              close-label="Close Alert"
              type="success"
              title="Success!"
              text="Leave Form saved successfully"
            />
            <VCard title="Emergency Contact">
              <VDivider />
              <VCardText>
                <!-- 👉 Form -->
                <VForm class="">
                  <VRow>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formData.licence.drvLicenceNumber "
                        label="Licence Number"
                        placeholder="A12345"
                        required
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formData.licence.drvLicenceAuthority"
                        label="Licence Authority"
                        placeholder=""
                        required
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formData.licence.drvLicenceIssueDate"
                        label="Licence Issue Date"
                        placeholder="01/01/2021"
                        type="date"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formData.licence.drvLicenceExpiryDate"
                        label="Licence Expiry Date"
                        placeholder="01/01/2021"
                        type="date"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VSwitch
                        v-model="formData.licence.drvLicenceActiveStatus"
                        label="Licence Active Status"
                      />
                    </VCol>
                    <!-- 👉 Form Actions -->
                    <VCol
                      cols="12"
                      class="d-flex flex-wrap gap-4"
                    >
                      <VBtn
                        color="primary gap-4"
                        @click="submitForm"
                      >
                        Save
                      </VBtn>
                  
                      <VBtn
                        color="secondary"
                        variant="tonal"
                        type="reset"
                        @click.prevent="resetForm"
                      >
                        Reset
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </vcardtext>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>
    </VWindow>
  </div>
</template>
