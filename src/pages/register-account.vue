<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  {
    title: 'Account',
    icon: 'mdi-account-plus-outline',
    tab: 'account',
  },
]

const store = useStore()

const rules = {
  required: value => !!value || 'This Field is Required.',
  passwordValid: v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) || 'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  passwordMatch: v => v === accountDataLocal.value.password || 'Passwords do not match',
}

const accountData = {
  first_name: '',
  last_name: '',
  username: '',
  password: '',
  re_password: '',
}

const isPasswordVisibleNew = ref(false)
const isPasswordVisibleConfirm = ref(false)
const accountDataLocal = ref(structuredClone(accountData))
const errorAlert = ref(false)
const successAlert = ref(false)
const errorAlertMessage = ref('')

const submitForm = async() => {
  try{
    await store.dispatch("signUp", accountDataLocal.value)
    errorAlertMessage.value = store.getters.loginError
    if(errorAlertMessage.value){
      errorAlert.value = true
      setTimeout(() => {
        errorAlert.value = false
      }, 5000)

      return
    }else{
      successAlert.value = true
      setTimeout(() => {
        successAlert.value = false
      }, 3000)
      resetForm()
    }
  } catch (err) {
    errorAlert.value = true
  }
}

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
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
    <VAlert
      v-if="errorAlert"
      type="error"
      border="start"
      variant="tonal"
      closable
      icon="mdi-account-off-outline"
      class="mt-5"
    >
      {{ errorAlertMessage }}
    </VAlert>
    <VAlert
      v-if="successAlert"
      type="success"
      dismissible
      border="left"
      variant="tonal"
      icon="mdi-account-check-outline"
      class="mt-5"
    >
      Account Created Successfully!
    </VAlert>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <VRow>
          <VCol cols="12">
            <VCard title="Register New User">
              <VDivider />

              <VCardText>
                <!-- 👉 Form -->
                <VForm
                  class="mt-2"
                  @submit.prevent="submitForm"
                >
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
                          :rules="[rules.required]"
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
                          :rules="[rules.required]"
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
                          :rules="[rules.required]"
                        />
                      </VCol>
                      <VCol
                        md="6"
                        cols="12"
                      >
                        <VTextField
                          v-model="accountDataLocal.password"
                          label="Password"
                          placeholder="********"
                          :rules="[rules.required, rules.passwordValid]"
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
                          v-model="accountDataLocal.re_password"
                          label="Confirm Password"
                          placeholder="********"
                          :rules="[rules.required, rules.passwordMatch]"
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
                        <VBtn type="submit">
                          Save
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
                  </vrow>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>
    </VWindow>
  </div>
</template>
