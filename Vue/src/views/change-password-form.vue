<template>
  <form @submit.prevent="onSubmit">
    <DxForm
      :form-data="formData"
      :disabled="loading"
    >
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
      <DxButtonItem>
        <DxButtonOptions
          width="100%"
          type="default"
          template="changePassword"
          :use-submit-behavior="true"
        />
      </DxButtonItem>

      <template #changePassword>
        <div>
          <span class="dx-button-text">
            <DxLoadIndicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Continue</span>
          </span>
        </div>
      </template>
    </DxForm>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DxForm, {
  DxItem,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
  DxCustomRule,
  DxRequiredRule,
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import auth from '../auth';

const router = useRouter();
const route = useRoute();

const recoveryCode = ref('');
const loading = ref(false);
const formData = reactive({
  password: '',
});

recoveryCode.value = route.params.recoveryCode as string;

async function onSubmit() {
  const { password } = formData;
  loading.value = true;

  const result = await auth.changePassword(password, recoveryCode.value);
  loading.value = false;

  if (result.isOk) {
    router.push('/login-form');
  } else {
    notify(result.message, 'error', 2000);
  }
}

function confirmPassword(e: any) {
  return e.value === formData.password;
}
</script>

<style>

</style>
