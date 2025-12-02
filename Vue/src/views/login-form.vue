<template>
  <form
    class="login-form"
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
        data-field="rememberMe"
        editor-type="dxCheckBox"
        :editor-options="{ text: 'Remember me', elementAttr: { class: 'form-text' } }"
      >
        <DxLabel :visible="false"/>
      </DxItem>
      <DxButtonItem>
        <DxButtonOptions
          width="100%"
          type="default"
          template="signInTemplate"
          :use-submit-behavior="true"
        />
      </DxButtonItem>
      <DxItem>
        <template #default>
          <div class="link">
            <router-link to="/reset-password">Forgot password?</router-link>
          </div>
        </template>
      </DxItem>
      <DxButtonItem>
        <DxButtonOptions
          text="Create an account"
          width="100%"
          :on-click="onCreateAccountClick"
        />
      </DxButtonItem>
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <DxLoadIndicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Sign In</span>
          </span>
        </div>
      </template>
    </DxForm>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import DxForm, {
  DxItem,
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
} from 'devextreme-vue/form';
import notify from 'devextreme/ui/notify';
import auth from '../auth';

const route = useRoute();
const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
});
const loading = ref(false);

function onCreateAccountClick() {
  router.push('/create-account');
}

async function onSubmit() {
  const { email, password } = formData;
  loading.value = true;
  const result = await auth.logIn(email, password);
  if (!result.isOk) {
    loading.value = false;
    notify(result.message, 'error', 2000);
  } else {
    router.push((route.query.redirect as string) || '/home');
  }
}
</script>

<style lang="scss">
@use "../themes/variables.base" as *;

.login-form {
  .link {
    text-align: center;
    font-size: 16px;
    font-style: normal;

    a {
      text-decoration: none;
    }
  }

  .form-text {
    margin: 10px 0;
    color: $base-text-color;
    opacity: 0.7;
  }
}
</style>
