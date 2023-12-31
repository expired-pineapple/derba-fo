<script setup>
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import { useTheme } from 'vuetify'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const userData = computed(() => store.getters.user)


// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

const vuetifyTheme = useTheme()

const drivers = [
  ['Drivers List', 'mdi-account-tie-outline', '/drivers'],
  ['Driver Emergency Contact', 'mdi-account-alert-outline', '/emergency-contact'],
  ['Driver Licence', "mdi-license", '/licence' ],
  ['Driver Djibouti Pass', "mdi-card-account-details-outline", "/driver-djibouti-pass"],
  ['Driver Passport', 'mdi-passport', '/driver-passport'],
  ['Driver Leave Logs', 'mdi-account-minus-outline', '/driver-leave-logs'],
  ['Infraction', 'mdi-account-alert-outline', '/infraction'],
  ['Assigned Trucks', 'mdi-truck-outline', '/trucks'],
]


const TrailerChildren = [
  ['Trailers', 'mdi-truck-trailer', '/trailers'],
  ['Bolo', 'mdi-truck-trailer', '/trailer-bolo'],
  ['COMESA ', 'mdi-truck-trailer', '/trailer-comesa'],
  ['Insurance', 'mdi-truck-trailer', '/trailer-insurance'],
  ['Third Party', 'mdi-truck-trailer', '/trailer-third-party'],
]

const FleetChildren = [
  ['Fleet', 'mdi-truck-outline', '/fleet'],
  ['Fleet Bolo', 'mdi-truck-outline', '/fleet-bolo'],
  ['Fleet COMESA ', 'mdi-truck-outline', '/fleet-comesa'],
  ['Fleet Insurance', 'mdi-truck-outline', '/fleet-insurance'],
  ['Fleet Third Party', 'mdi-truck-outline', '/fleet-third-party'],
]

const TrucksConfig = [
  ['Truck List', 'mdi-truck-outline', '/trucks'],
]

const   Dispatch = [
  ['Frieght Order', 'mdi-truck-delivery-outline', '/shipment'],
  ['Routes', 'mdi-map-marker-path', '/trip-information'],
]

const Accounting = [
  ['Advance Payment', 'mdi-account-cash-outline', '/advance-payment' ],
  ['Settlements', 'mdi-piggy-bank-outline', '/settlements'],
]

const Customers = [
  ['Customers', 'mdi-account-cash-outline', '/customer'],
  ['Customer Contacts', 'mdi-card-account-mail-outline', '/customer-contact'],
]

const Settings = [
  ['Comodities', 'mdi-cash', '/comodities' ],
  ['Comodity Categories', 'mdi-cash', '/category' ],
  ['Routes', 'mdi-map-marker-path', '/trip-information'],
  ['Fuel Stations', 'mdi-fuel', '/fuel-station'],
  ['User Logs', 'mdi-account-outline', '/user-logs'],
]

const Tire = [
  ['Tire Provision', 'mdi-tire', '/tire-provision'],
  ['Tire Return', 'mdi-tire', '/tire-return'],
]

const Reports = [
  ['FO Report', 'mdi-truck-delivery-outline', '/fo-report'],
  ['Fuel Report', 'mdi-fuel', '/fuel-report'],
]
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="mdi-menu" />
        </IconBtn>


        <VSpacer />


        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VList
        v-model="verticalNavActive"
        style="width: 100%; background: none;"
        dense
        nav
        color="primary"
        class="py-0 elevation-0"
      >
        <VListItem
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          to="/dashboard"
          color="primary"
        />
        <VListItem
          prepend-icon="mdi-account-plus-outline"
          title="Register Users"
          to="/register-account"
          color="primary"
        />
        <VListGroup value="Drivers">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-account-tie-outline"
              title="Drivers"
            />
          </template>
          <VListItem
            v-for="([title, icon,to], i) in drivers"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
        </VListGroup>
        <VListGroup value="Trucks">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-truck-outline"
              title="Vehicles"
            />
          </template>
          <VListGroup value="FleetChildren">
            <template #activator="{ props }">
              <VListItem
                v-bind="props"
                prepend-icon="mdi-truck-outline"
                title="Fleet"
              />
            </template>
            <VListItem
              v-for="([title, icon,to], i) in FleetChildren"
              :key="i"
              :title="title"
              :to="to"
              :prepend-icon="icon"
              :value="title"
            />
          </VListGroup>
          <VListGroup value="TrailerChildren">
            <template #activator="{ props }">
              <VListItem
                v-bind="props"
                prepend-icon="mdi-truck-trailer"
                title="Trailers"
              />
            </template>
            <VListItem
              v-for="([title, icon,to], i) in TrailerChildren"
              :key="i"
              :title="title"
              :to="to"
              :prepend-icon="icon"
              :value="title"
            />
          </VListGroup>
        </VListGroup>
        <VListGroup value="TrucksConfig">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-truck-outline"
              title="Trucks"
            />
          </template>
          <VListItem
            v-for="([title, icon,to], i) in TrucksConfig"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
          <VListGroup value="Tire">
            <template #activator="{ props }">
              <VListItem
                v-bind="props"
                prepend-icon="mdi-tire"
                title="Tire"
              />
            </template>
            <VListItem
              v-for="([title, icon,to], i) in Tire"
              :key="i"
              :title="title"
              :to="to"
              :prepend-icon="icon"
              :value="title"
            />
          </VListGroup>
        </VListGroup>

        <VListGroup value="Dispatch">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-truck-fast-outline"
              title="Dispatch"
            />
          </template>
          <VListItem
            v-for="([title, icon,to], i) in Dispatch"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
        </VListGroup>
        <VListGroup value="Accounting">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-account-cash-outline"
              title="Accounting"
            />
          </template>
          <VListItem
            v-for="([title, icon,to], i) in Accounting"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
        </VListGroup>
        <VListGroup value="Customers">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-account-multiple-outline"
              title="Customers"
            />
          </template>
          <VListItem
            v-for="([title, icon,to], i) in Customers"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
        </VListGroup>
        <VListGroup value="Reports">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-file-chart-outline"
              title="Reports"
            />
          </template>
          <VListItem
            v-for="([title, icon,to], i) in Reports"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
        </VListGroup>
        <VListGroup value="Settings">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-cog-outline"
              title="Settings"
            />
          </template>
          <VListItem
            v-for="([title, icon,to], i) in Settings"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
        </VListGroup>
      </VList>
    </template>


    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>



<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
