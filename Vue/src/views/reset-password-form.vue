<template>
  <form
    class="reset-password-form"
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
      <DxButtonItem>
        <DxButtonOptions
          :element-attr="{ class: 'submit-button' }"
          width="100%"
          type="default"
          template="resetTemplate"
          :use-submit-behavior="true"
        />
      </DxButtonItem>
      <DxItem>
        <template #default>
          <div class="login-link">
            Return to <router-link to="/login-form">Sign In</router-link>
          </div>
        </template>
      </DxItem>
      <template #resetTemplate>
        <div>
          <span class="dx-button-text">
            <DxLoadIndicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Reset my password</span>
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
  DxRequiredRule,
  DxEmailRule,
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import auth from '../auth';

const notificationText =
  "We've sent a link to reset your password. Check your inbox.";

const router = useRouter();

const loading = ref(false);
const formData = reactive({
  email: '',
});

async function onSubmit() {
  const { email } = formData;
  loading.value = true;

  const result = await auth.resetPassword(email);
  loading.value = false;

  if (result.isOk) {
    router.push('/login-form');
    notify(notificationText, 'success', 2500);
  } else {
    notify(result.message, 'error', 2000);
  }
}
</script>

<style lang="scss">
@use "../themes/variables.base" as *;

.reset-password-form {
  .submit-button {
    margin-top: 10px;
  }

  .login-link {
    color: $base-accent;
    font-size: 16px;
    text-align: center;
  }
}
</style>
