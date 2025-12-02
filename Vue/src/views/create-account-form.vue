<template>
  <form
    class="create-account-form"
    @submit.prevent="onSubmit"
  >
    <DxForm
      :form-data="formData"
      :disabled="loading"
    >
      <DxItem
        data-field="email"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Email', mode: 'email' }"
      >
        <DxRequiredRule message="Email is required"/>
        <DxEmailRule message="Email is invalid"/>
        <DxLabel :visible="false"/>
      </DxItem>
      <DxItem
        data-field="password"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Password', mode: 'password' }"
      >
        <DxRequiredRule message="Password is required"/>
        <DxLabel :visible="false"/>
      </DxItem>
      <DxItem
        data-field="confirmedPassword"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Confirm Password', mode: 'password' }"
      >
        <DxRequiredRule message="Password is required"/>
        <DxCustomRule
          message="Passwords do not match"
          :validation-callback="confirmPassword"
        />
        <DxLabel :visible="false"/>
      </DxItem>
      <DxItem>
        <template #default>
          <div class="policy-info">
            By creating an account, you agree to the
            <router-link to="#">Terms of Service</router-link>
            and <router-link to="#">Privacy Policy</router-link>
          </div>
        </template>
      </DxItem>
      <DxButtonItem>
        <DxButtonOptions
          width="100%"
          type="default"
          template="createAccount"
          :use-submit-behavior="true"
        />
      </DxButtonItem>
      <DxItem>
        <template #default>
          <div class="login-link">
            Have an account? <router-link to="/login-form">Sign In</router-link>
          </div>
        </template>
      </DxItem>
      <template #createAccount>
        <div>
          <span class="dx-button-text">
            <DxLoadIndicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Create a new account</span>
          </span>
        </div>
      </template>
    </DxForm>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import DxForm, {
  DxItem,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
  DxCustomRule,
  DxRequiredRule,
  DxEmailRule,
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import auth from '../auth';

const router = useRouter();

const loading = ref(false);
const formData = reactive({
  email: '',
  password: '',
});

const onSubmit = async() => {
  const { email, password } = formData;
  loading.value = true;

  const result = await auth.createAccount(email, password);
  loading.value = false;

  if (result.isOk) {
    router.push('/login-form');
  } else {
    notify(result.message, 'error', 2000);
  }
};

function confirmPassword(e: any) {
  return e.value === formData.password;
}
</script>

<style lang="scss">
@use "../themes/variables.base" as *;

.create-account-form {
  .policy-info {
    margin: 10px 0;
    color: $base-text-color;
    opacity: 0.7;
    font-size: 14px;
    font-style: normal;

    a {
      color: $base-text-color;
      opacity: 0.7;
    }
  }

  .login-link {
    color: $base-accent;
    font-size: 16px;
    text-align: center;
  }
}
</style>
