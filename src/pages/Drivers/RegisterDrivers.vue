<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useStore } from 'vuex'

const formData = {
  driverData: {
    driver_name: "",
    phone: "",
    email: "",
    permanent_residence: "",
    driver_dmc_id: "",
    department: "",
    Job_title: "",
    employment_status: "",
    note_on_driver: "",
    is_active: false,
  },
  emergency_contact: {
    drvContactName: "",
    drvContactPhone: "",
    drvContactRelationship: "",
    drvContactAdress: "",
    drvContactActiveStatus: false,
  },
  licence: {
    drvLicenceNumber: "",
    drvLicenceAuthority: "",
    drvLicenceIssueDate: "",
    drvLicenceExpiryDate: "",
    drvLicenceActiveStatus: false,
  },
  passport: {
    drvPassportNo: "",
    drvPassportAuthority: "",
    drvPassportIssuanceDate: "",
    drvPassportExpireDate: "",
    drvPassportActiveStatus: false,
  },
}

const formDataLocal = ref(structuredClone(formData))

const route = useRoute()
const store = useStore()

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

const resetForm = () => {
  formDataLocal.value = structuredClone(formData)
  
}

const alert = ref(false)
const type = ref('')
const title = ref('')
const text = ref('')

const submitForm =async () => {
  try {
    await store.dispatch('createDriver', formDataLocal.value)
    if(store.getters.createError){
      alert.value = true
      type.value = 'error'
      title.value = 'Error'
      text.value = 'Driver Creation Failed'
    }else{
      alert.value = true
      type.value = 'success'
      title.value = 'Success'
      text.value = 'Driver Created Successfully'
      resetForm()
    }
  } catch (error) {
    console.log(error)
  }
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
      <VAlert
        v-model="alert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        :type="type"
        :title="title"
        :text="text"
      />

      <!-- Driver -->
      <VWindowItem value="Driver">
        <VRow>
          <VCol cols="12">
            <VCard title="Basic Information">
              <VDivider />

              <VCardText>
                <!-- 👉 Form -->
                <VForm class="">
                  <!-- 👉Is Active -->
                  <VRow>
                    <VCol cols="12">
                      <VSwitch
                        v-model="formDataLocal.driverData.is_active"
                        label="Is Active"
                        color="primary"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <!-- 👉 Full Name -->
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.driverData.driver_name"
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
                        v-model="formDataLocal.driverData.email"
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
                        v-model="formDataLocal.driverData.permanent_residence"
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
                        v-model="formDataLocal.driverData.phone"
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
                        v-model="formDataLocal.driverData.driver_dmc_id"
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
                        v-model="formDataLocal.driverData.department"
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
                        v-model="formDataLocal.driverData.Job_title"
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
                        v-model="formDataLocal.driverData.employment_status"
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
                        v-model="formDataLocal.driverData.note_on_driver"
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
      <!-- Passport -->
      <VWindowItem value="passport">
        <VRow>
          <VCol cols="12">
            <VCard title="Passport">
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
                        v-model="formDataLocal.passport.drvPassportNo"
                        label="Passport Number"
                        placeholder="A12345"
                        required
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.passport.drvPassportIssuanceDate"
                        label="Passport Issue Date"
                        placeholder="01/01/2021"
                        required
                        type="date"
                      />
                    </VCol>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.passport.drvPassportExpireDate"
                        label="Passport Expiry Date"
                        placeholder="01/01/2021"
                        required
                        type="date"
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
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>
      <!-- Licence -->
      <VWindowItem value="licence">
        <VRow>
          <VCol cols="12">
            <VCard title="Licence">
              <VDivider />
              <VCardText>
                <VForm>
                  <VRow>
                    <VCol
                      md="6"
                      cols="12"
                    >
                      <VTextField
                        v-model="formDataLocal.licence.drvLicenceNumber"
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
                        v-model="formDataLocal.licence.drvLicenceAuthority"
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
                        v-model="formDataLocal.licence.drvLicenceIssueDate"
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
                        v-model="formDataLocal.licence.drvLicenceExpiryDate"
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
                        v-model="formDataLocal.licence.drvLicenceActiveStatus"
                        label="Licence Active Status"
                      />
                    </VCol>
                    <!-- Form Actions -->
                    <VCol
                      cols="12"
                      class="d-flex flex-wrap gap-4"
                    >
                      <VBtn
                        color="primary"
                        @click="submitForm"
                      >
                        Save
                      </VBtn>
                      <VBtn
                        color="secondary"
                        variant="tonal"
                        type="reset"
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
    </VWindow>
  </div>
</template>
