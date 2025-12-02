<template>
  <div id="root">
    <div :class="cssClasses">
      <component
        :is="$route.meta.layout"
        :title="title"
        :is-x-small="screen.isXSmall"
        :is-large="screen.isLarge"
      >
        <div class="content">
          <RouterView/>
        </div>
        <template #footer>
          <AppFooter class="dx-theme-text-color"/>
        </template>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, reactive } from 'vue';
import AppFooter from './components/app-footer.vue';
import { sizes, subscribe, unsubscribe } from './utils/media-query';
import theme from './services/theme-service';
import appInfo from './app-info';

interface ScreenSizeInfo {
  isXSmall: boolean;
  isLarge: boolean;
  cssClasses: string[];
}

function getScreenSizeInfo(): ScreenSizeInfo {
  const screenSizes = sizes();
  return {
    isXSmall: screenSizes.isXSmall,
    isLarge: screenSizes.isLarge,
    cssClasses:
      Object.keys(screenSizes).filter((cl) => screenSizes[cl as keyof typeof screenSizes]),
  };
}

// Apply theme on app startup
theme.applyTheme();

const title = appInfo.title;

const screen = reactive<ScreenSizeInfo>(getScreenSizeInfo());

function screenSizeChanged() {
  Object.assign(screen, getScreenSizeInfo());
}

onMounted(() => {
  subscribe(screenSizeChanged);
});

onBeforeUnmount(() => {
  unsubscribe(screenSizeChanged);
});

const cssClasses = computed(() => {
  return ['app'].concat(screen.cssClasses);
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  min-height: 100%;
  height: 100%;
}

#root {
  height: 100%;
}

* {
  box-sizing: border-box;
}

.app {
  @import './themes/variables.base.scss';
  background-color: darken($base-bg, 5);
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
