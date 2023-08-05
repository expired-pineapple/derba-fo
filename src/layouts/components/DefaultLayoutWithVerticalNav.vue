<script setup>
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import { useTheme } from 'vuetify'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

const vuetifyTheme = useTheme()

const drivers = [
  ['Drivers List', 'mdi-account-tie-outline', '/drivers'],
  ['Driver Leave Logs', 'mdi-account-minus-outline', '/driver-leave-logs'],
  ['Infractions', 'mdi-account-remove-outline', '/infractions'],
]

const Trucks = [
  ['Truck', 'mdi-truck-outline', '/trucks'],
  ['Maintenance', 'mdi-wrench-cog-outline', '/maintenance'],
]

const   Dispatch = [
  ['Shipments', 'mdi-truck-delivery-outline', '/shipment'],
  ['Routes', 'mdi-map-marker-path', '/dispatch/list'],
  ['Frieght Order', 'mdi-file-document-multiple-outline', '/driver/leave-logs'],
]

const Accounting = [
  ['Advance Payment', 'mdi-account-cash-outline', '/advance-payment' ],
  ['Settlements', 'mdi-piggy-bank-outline', '/settlements'],
]

const Customers = [
  ['Customers', 'mdi-account-cash-outline', '/customer'],
  ['Customer Contacts', 'mdi-card-account-mail-outline', '/customers/contact/list'],
]

const Settings = [
  ['Fuel', 'mdi-fuel', '/fuel'],
  ['Infraction Type', 'mdi-account-remove-outline', '/infration-type'],
  ['Maintenance Type', 'mdi-wrench-cog-outline', '/maintenance-type'],
  ['Insurance', 'mdi-shield-car'],

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
      <VList>
        <VListItem
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          to="/dashboard"
          color="primary"
        />
        <VListItem
          prepend-icon="mdi-account-cog-outline"
          title="Account Settings"
          to="/account-settings"
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
          <VListItem
            v-for="([title, icon,to], i) in Trucks"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
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
