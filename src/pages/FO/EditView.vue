<script setup>
import { useRoute } from "vue-router"
import { useStore } from "vuex"

const navigationTab = ref('ITEM ONE')

const tabItems = [
  { title: 'Fuel', tab: 'fuel' },
  { title: 'Advance', tab: 'advance' },
  { title: 'Perdieum', tab: 'perdieum' },
  { title: 'Settlement', tab: 'settlement' },
]

const totalAdvance = ref(0)

const nextTab = () => {
  const index = tabItems.findIndex(item => item.tab === navigationTab.value)

  navigationTab.value = tabItems[index + 1].tab
}

const store = useStore()
const route = useRoute()

const submitForm = () => {
  const index = tabItems.findIndex(item => item.tab === navigationTab.value)

  switch (index) {
  case 0:
    store.dispatch('fetchFuels', route.params.id)
    fuelDataLocal.value = store.getters.fuel
    break
  case 1:
    store.dispatch('fetchAdvances', route.params.id)
    advanceDataLocal.value = store.getters.advance
    break
  case 2:
    store.dispatch('fetchPerdiuems', route.params.id)
    perdieumDataLocal.value = store.getters.perdieum
    break
  case 3:
    store.dispatch('fetchSettlement', route.params.id)
    settlementDataLocal.value = store.getters.settlement
    break
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
            :value="item.tab"
          >
            {{ item.title }}
          </VTab>
        </VTabs>

        <VDivider class="mb-4" />

        <!-- tabs content -->
        <VWindow v-model="navigationTab">
          <VWindowItem value="fuel">
            <VCardText>
              <VForm>
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="fuelDataLocal.fuelStationID"
                      placeholder="Fuel Station"
                      label="Fuel Station"
                      :items="['Demo',
                               'Demo2',
                               'Demo3']"
                      item-value="id"
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="fuelDataLocal.fuelPmtType"
                      label="Fuel Permit Type"
                      placeholder="Fuel Permit Type"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="fuelDataLocal.fuelCapNo"
                      label="Fuel Coupon Number"
                      placeholder="Fuel Coupon Number"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="fuelDataLocal.fuelAmt"
                      label="Fuel Amount(L)"
                      outlined
                      required
                      type="number"
                      placeholder="Fuel Amount in Liters"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="fuelDataLocal.fuelCashBirr"
                      label="Fuel Cash Birr"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="fuelDataLocal.foOpenKm"
                      label="Open Km"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <VTextarea
                      v-model="fuelDataLocal.fuelCapRmk"
                      label="Remark"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click.prevent="submitForm">
                      Save
                    </VBtn>

                    <VBtn
                      color="primary"
                      variant="tonal"
                      type="reset"
                      @click.prevent="nextTab"
                    >
                      Next
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VWindowItem>
          <VWindowItem value="advance">
            <VCardText>
              <VForm>
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advDate"
                      label="Advance Date"
                      placeholder="Advance Date"
                      outlined
                      required
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advParking"
                      label="Parking"
                      placeholder="Parking"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advDjiboEnter"
                      label="Djibouti Entrance Fee"
                      placeholder="Djibouti Entrance Fee"
                      outlined
                      type="number"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advLoadUnload"
                      label="Load/Unload"
                      placeholder="Fuel Coupon Number"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advTyerRepair"
                      label="Tyer Repair"
                      outlined
                      required
                      placeholder="Tyer Repair"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advCarWash"
                      label="Car Wash"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advFuelOnCash"
                      label="Fuel On Cash"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advOther"
                      label="Other"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <VTextField
                      v-model="advanceDataLocal.advTotalAdv"
                      label="Total Advance"
                      outlined
                      readonly
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <VTextarea
                      v-model="advanceDataLocal.advRemark"
                      label="Remark"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click.prevent="submitForm">
                      Save
                    </VBtn>
                    <VBtn
                      color="primary"
                      variant="tonal"
                      type="reset"
                      @click.prevent="nextTab"
                    >
                      Next
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VWindowItem>
          <VWindowItem value="perdieum">
            <VCardText>
              <VForm>
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSelect
                      v-model="perdieumDataLocal.FoId"
                      :items="fos"
                      label="Freight Order"
                      item-text="FoName"
                      item-value="FoId"
                      outlined
                      dense
                      required
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="perdieumDataLocal.prdDate"
                      label="Date"
                      type="date"
                      outlined
                      dense
                      required
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="perdieumDataLocal.prdNoDays"
                      label="No. of Days"
                      type="number"
                      outlined
                      dense
                      required
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSelect
                      v-model="perdieumDataLocal.prdIsTaxable"
                      :items="['Yes', 'No']"
                      label="Is Taxable"
                      outlined
                      dense
                      required
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="perdieumDataLocal.prdPmtPerDay"
                      label="Payment Per Day"
                      type="number"
                      outlined
                      dense
                      required
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="perdieumDataLocal.prdTaxblAmt"
                      label="Taxable Amount"
                      type="number"
                      outlined
                      dense
                      required
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="perdieumDataLocal.prdDeduct"
                      label="Deduction"
                      type="number"
                      outlined
                      dense
                      required
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="perdieumDataLocal.prdNetPmt"
                      label="Net Payment"
                      type="number"
                      outlined
                      dense
                      required
                    /> 
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="perdieumDataLocal.prdRemark"
                      label="Remark"
                      outlined
                      dense
                      required
                    />
                  </VCol>
                </VRow>
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn
                    :loading="formLoading"
                    @click.prevent="submitForm"
                  >
                    Save
                  </VBtn>

                  <VBtn
                    color="primary"
                    variant="tonal"
                    type="reset"
                    @click.prevent="nextTab"
                  >
                    Next
                  </VBtn>
                </VCol>
              </VForm>
            </VCardText>
          </VWindowItem>
          <VWindowItem value="settlement">
            <VCardText>
              <VForm>
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="settlementDataLocal.TrkId"
                      :items="trucks"
                      item-value="id"
                      item-title="FltId.fltFleetNo"
                      :loading="loading"
                      label="Truck"
                      placeholder="Select a truck"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="settlementDataLocal.TrpId"
                      label="Route"
                      :items="trips"
                      item-value="id"
                      item-title="trpRouteName"
                      :loading="loading"
                      placeholder="Select a route"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="settlementDataLocal.MtrId"
                      label="Material"
                      :items="material"
                      item-value="id"
                      item-title="mtrName"
                      :loading="loading"
                      placeholder="Select a material"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="settlementDataLocal.CustomerID"
                      label="Customer"
                      :items="customer"
                      item-value="id"
                      item-title="cmrName"
                      :loading="loading"
                      placeholder="Select a Customer"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foNo"
                      label="FO No"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foDate"
                      label="FO Date"
                      outlined
                      required
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foTime"
                      label="FO Time"
                      outlined
                      required
                      type="time"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foOpenKm"
                      label="Open Km"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foRmk"
                      label="Remark"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foRtnDate"
                      label="Return Date"
                      outlined
                      required
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foRtnTime"
                      label="Return Time"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foCloseKm"
                      label="Close Km"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foMtrQuantity"
                      label="Meter Quantity"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foWbNo"
                      label="Wb No"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="settlementDataLocal.foWbBill"
                      label="Wb Bill"
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                  >
                    <VBtn @click.prevent="submitForm">
                      Save Changes
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCard>
    </VCol>
  </VRow>
</template>
