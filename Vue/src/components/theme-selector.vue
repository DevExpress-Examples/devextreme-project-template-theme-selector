<template>
  <DxSelectBox
    :items="themeSource"
    :value="currentTheme"
    value-expr="value"
    display-expr="text"
    width="145px"
    styling-mode="outlined"
    @value-changed="onValueChanged"
    field-template="field"
    item-template="item"
    :drop-down-options="{wrapperAttr: {class: 'selectboxDropdown'} }"
  >
    <template #field="{ data }">
      <div class="custom-item">
        <img
          class="theme-icon"
          :src="data.ImageSrc "
        >
        <DxTextBox
          width="80px"
          :input-attr="{class:'dx-theme-text-color theme-textbox' }"
          :value="data.text"
          :read-only="true"
        />
      </div>
    </template>
    <template #item="{ data }">
      <div class="custom-item">
        <img
          class="theme-icon"
          :src="data.ImageSrc"
        >
        <div class="theme-text">
          {{ data.text }}
        </div>
      </div>
    </template>
  </DxSelectBox>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import theme from '../services/theme-service';
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';

const currentTheme = ref(theme.getTheme());
const themeSource = theme.getThemeData();

function onValueChanged(e: any) {
  theme.applyTheme(e.value);
}
</script>

<style>
.selectboxDropdown .dx-list-item-content {
    font-size: 16px;
    padding: 0px;
}

.custom-item {
    height:42px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.theme-icon {
    height:24px;
    width:24px;
    margin-left:8px;
    margin-right:8px;
}

.dx-texteditor.dx-editor-outlined .dx-texteditor-input.theme-textbox {
    font-size: 14px;
    padding: 0px;
}

.theme-text {
    font-size: 14px;
    height: 17px;
}
</style>
