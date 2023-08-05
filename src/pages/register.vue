<script setup>
import { useTheme } from 'vuetify'
import logo from '@images/logo.png'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'

const form = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  re_password: '',
}



const isPasswordVisible = ref(false)
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
          Derba FO Manager
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <p class="text-h6 text-center">
          <VIcon
            icon="mdi-account-plus-outline"
            class="mr-2"
          />
          Register  User
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- First Name -->
            <VCol cols="12">
              <VTextField
                v-model="form.first_name"
                label="First Name "
              />
            </VCol>
            <!-- Last Name -->
            <VCol cols="12">
              <VTextField
                v-model="form.last_name"
                label="Last Name"
              />
            </VCol>
            <!-- Username -->
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
            </VCol>

            
            <!--  re password -->
            <VCol cols="12">
              <VTextField
                v-model="form.re_password"
                label="Confirm Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            
            
            <VBtn
              block
              type="submit"
              to="/"
            >
              Sign up
            </VBtn>
          </VRow>
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
