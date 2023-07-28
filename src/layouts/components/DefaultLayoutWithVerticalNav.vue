<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { useTheme } from 'vuetify'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

const vuetifyTheme = useTheme()
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
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'mdi-home-outline',
          to: '/dashboard',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Account Settings',
          icon: 'mdi-gear-outline',
          to: '/account-settings',
        }"
      />
      <!-- 👉 Pages -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Driver',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Driver',
          icon:'mdi-account-tie-outline',
          to: '/drivers',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Driver Leave Logs',
          icon: 'mdi-account-minus-outline',
          to: '/driver-leave-logs',
        }"
      />
        
      <!-- 👉Trucks -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Fleet',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Trucks',
          icon: 'mdi-truck-outline',
          to: '/trucks',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Trip Information',
          icon: 'mdi-truck-delivery-outline',
          to: '/trip-information',
        }"
      />
      <!-- 👉FO -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Freight Order',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Freight Orders',
          icon: 'mdi-truck-fast-outline',
          to: '/freight-orders',
        }"
      />
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
