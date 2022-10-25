<template>
    <DxSelectBox 
        :items="themeSource"
        :value="currentTheme"
        valueExpr="value"
        displayExpr="text"
        @value-changed="onValueChanged"/>
</template>
<script>
import theme from '../services/theme-service';
import DxSelectBox from 'devextreme-vue/select-box';
export default {
  components: {
    DxSelectBox,
  },
  data() {
    let currentTheme = theme.getTheme()
    let themeSource = theme.getThemeData()
    return {
        currentTheme,
        themeSource
    };
  },
  methods:{
    onValueChanged(e){
      theme.applyTheme(e.value)
    }
  }
};
</script>