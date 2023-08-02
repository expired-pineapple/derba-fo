<script setup>
const navigationTab = ref('ITEM ONE')

const items =
  [
    {
      "Dispatch ID": "ET-D0001",
      "Driver": "Abebe Kebede",
      "Route": "Addis Ababa to Bahir Dar",
      "Vehicle ID": {
        "Registration ID": "ET-1234-21",
        "Plate Number": "3H-4567",
      },
    },
    {
      "Dispatch ID": "ET-D0002",
      "Driver": "Meseret Lemma",
      "Route": "Addis Ababa to Dire Dawa",
      "Vehicle ID": {
        "Registration ID": "ET-5678-21",
        "Plate Number": "3J-8901",
      },
    },
    {
      "Dispatch ID": "ET-D0003",
      "Driver": "Tewodros Mengistu",
      "Route": "Addis Ababa to Gondar",
      "Vehicle ID": {
        "Registration ID": "ET-9012-21",
        "Plate Number": "3K-3456",
      },
    },
    {
      "Dispatch ID": "ET-D0004",
      "Driver": "Tiruwork Tadesse",
      "Route": "Addis Ababa to Hawassa",
      "Vehicle ID": {
        "Registration ID": "ET-3456-22",
        "Plate Number": "3L-7890",
      },
    },
    {
      "Dispatch ID": "ET-D0005",
      "Driver": "Dereje Bekele",
      "Route": "Addis Ababa to Mekelle",
      "Vehicle ID": {
        "Registration ID": "ET-6789-22",
        "Plate Number": "3M-1234",
      },
    },
    {
      "Dispatch ID": "ET-D0006",
      "Driver": "Wubshet Assefa",
      "Route": "Addis Ababa to Jimma",
      "Vehicle ID": {
        "Registration ID": "ET-0123-23",
        "Plate Number": "3N-5678",
      },
    },
  ]


const tabItems = [
  'Fuel Advance',
  'Per Diem',
  'Other Advance',
]

const tabContent = 'Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards...'

const nextTab = () => {
  const index = tabItems.indexOf(navigationTab.value)
  if (index < tabItems.length - 1) {
    navigationTab.value = tabItems[index + 1]
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          Dispatch Information
        </VCardTitle>
        <VDivider />
        <VForm>
          <VContainer>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="driverName"
                  :items="['Abebe Kebede','Jane Doe', 'Chaltu Kebede','Yohannes Alemu']"

                  label="Dispatch"
                  disabled
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="driverName"
                  :items="['Abebe Kebede','Jane Doe', 'Chaltu Kebede','Yohannes Alemu']"

                  label="Driver"
                  disabled
                  required
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="driverName"
                  :items="['Abebe Kebede','Jane Doe', 'Chaltu Kebede','Yohannes Alemu']"

                  label="Route"
                  disabled
                  required
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="driverName"
                  :items="['Abebe Kebede','Jane Doe', 'Chaltu Kebede','Yohannes Alemu']"

                  label="Vehicle ID"
                  disabled
                  required
                />
              </VCol>
            </vrow>
          </VContainer>
        </VForm>
      </VCard>
    </VCol>
    <VCol
      md="12"
      cols="12"
    >
      <VCard>
        <VTabs v-model="navigationTab">
          <VTab
            v-for="item in tabItems"
            :key="item"
            :value="item"
          >
            {{ item }}
          </VTab>
        </VTabs>

        <VDivider />

        <!-- tabs content -->
        <VWindow v-model="navigationTab">
          <VWindowItem
            v-for="item in tabItems"
            :key="item"
            :value="item"
          >
            <VCardText>
              Form Goes Here
            </VCardText>

            <VCardText class="d-flex flex-wrap gap-4">
              <VBtn
                v-if="navigationTab !== 'Fuel Advance'"
                color="transparent text-primary gap-4"
              >
                Back
              </VBtn>
              <VBtn
                v-if="navigationTab !== 'Other Advance'"
                color="primary gap-4"
                @click="
                  nextTab"
              >
                Next
              </VBtn>
              <VBtn
                v-if="navigationTab === 'Other Advance'"
                color="primary gap-4"
              >
                Submit
              </VBtn>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCard>
    </VCol>
  </VRow>
</template>
