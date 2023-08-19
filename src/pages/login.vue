<script setup>
import logo from '@images/logo.png'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import validators from '@/validators'

import { useTheme } from 'vuetify'
import store from '@/store'
import { computed } from 'vue'

const form = ref({
  username: '',
  password: '',
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)



const error = computed(() => store.getters.loginError)

async function login() {
  try {
    await store.dispatch('login', form.value)
  } catch (err) {
    console.log(err)
    error.value = err.message
  }
}

const isRequired = validators.isEmpty
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <VImg
              :src="logo"
              :width="50"
            />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Derba MIDROC
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <p class="mb-0">
          Welcome, Please sign-in to your account
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <VCol cols="12">
              <VAlert
                v-if="error"
                type="error"
                dismissible
                border="left"
                elevation="2"
                icon="mdi-alert-circle-outline"
                class="mb-4"
              >
                {{ error }}
              </VAlert>
            </VCol>
            <VRow>
              <!-- username -->
              <VCol cols="12">
                <VTextField
                  v-model="form.username"
                  label="Username"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4" />

                <!-- login button -->
                <VBtn
                  block
                  type="submit"
                  @click="login"
                >
                  Login
                </VBtn>
              </VCol>
            </VRow>
          </vrow>
        </VForm>
      </VCardText>
    </VCard>



    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
