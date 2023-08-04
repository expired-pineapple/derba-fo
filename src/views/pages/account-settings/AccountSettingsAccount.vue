<script setup>
const accountData = {
  first_name: 'John',
  last_name: 'Doe',
  username: 'johnDoe',
}

const password = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const isPasswordVisibleCurrent = ref(false)
const isPasswordVisibleNew = ref(false)
const isPasswordVisibleConfirm = ref(false)
const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Basic Information">
        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-2">
            <VRow>
              <VRow>
                <!-- 👉 First Name -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.first_name"
                    label="First Name"
                    placeholder="John"
                    disabled
                  />
                </VCol>
                <!-- 👉 Last Name -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.last_name"
                    label="Last Name"
                    placeholder="Doe"
                    disabled
                  />
                </VCol>
                <!-- 👉 Username -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.username"
                    label="Username"
                    disabled
                  />
                </VCol>
                <VCol
                  md="12"
                  cols="6"
                >
                  <VCardTitle>
                    Change Password
                  </VCardTitle>
                  <VDivider />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.currentPassword"
                    label="Current Password"
                    placeholder="********"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.newPassword"
                    label="New Password"
                    placeholder="********"
                    :type="isPasswordVisibleNew ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisibleNew ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisibleNew = !isPasswordVisibleNew"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.confirmPassword"
                    label="Confirm Password"
                    placeholder="********"
                    :type="isPasswordVisibleConfirm ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisibleConfirm ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisibleConfirm = !isPasswordVisibleConfirm"
                  />
                </VCol>
                <!-- 👉 Form Actions -->
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn>Save changes</VBtn>

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
            </vrow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
