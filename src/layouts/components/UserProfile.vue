<template>
  <VAvatar
    class="cursor-pointer"
    color="primary"
    variant="tonal"
  >
    <VIcon>
      mdi-account-outline
    </VIcon>

    <!-- SECTION Menu -->
    <VMenu
      activator="parent"
      width="230"
      location="bottom end"
      offset="14px"
    >
      <VList>
        <!-- 👉 User Avatar & Name -->
        <VListItem>
          <template #prepend>
            <VListItemAction start>
              <VAvatar
                color="primary"
                variant="tonal"
              >
                <VIcon>
                  mdi-account-outline
                </VIcon>
              </VAvatar>
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ userData.first_name }} {{ userData.last_name }}
          </VListItemTitle>
          <VListItemSubtitle>Admin</VListItemSubtitle>
        </VListItem>
        <!-- Divider -->
        <VDivider class="my-2" />

        <!-- 👉 Account Settings -->
        <VListItem to="/account-settings">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="mdi-account-cog-outline"
              size="22"
            />
          </template>

          <VListItemTitle>Account Settings</VListItemTitle>
        </VListItem>
        <VListItem @click="logout">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="mdi-logout"
              size="22"
            />
          </template>

          <VListItemTitle>Logout</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
  </VAvatar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const userData= store.getters.user

const logout = () => {
  console.log('logout')
  store.dispatch('logout')
  router.push('/login')
}
</script>
