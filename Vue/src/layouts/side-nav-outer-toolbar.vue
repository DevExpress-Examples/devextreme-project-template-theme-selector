<template>
  <div class="side-nav-outer-toolbar dx-theme-background-color">
    <HeaderToolbar
      class="layout-header"
      :menu-toggle-enabled="true"
      :toggle-menu-func="toggleMenu"
      :title="title"
    />
    <DxDrawer
      class="layout-body"
      position="before"
      template="menuTemplate"
      v-model:opened="menuOpened"
      :opened-state-mode="drawerOptions.openedStateMode"
      :reveal-mode="drawerOptions.revealMode"
      :min-size="drawerOptions.minSize"
      :max-size="drawerOptions.maxSize"
      :shading="drawerOptions.shading"
      :close-on-outside-click="drawerOptions.closeOnOutsideClick"
    >
      <DxScrollView
        ref="scrollViewRef"
        class="with-footer"
      >
        <slot/>
        <slot name="footer"/>
      </DxScrollView>
      <template #menuTemplate>
        <SideNavMenu
          :compact-mode="!menuOpened"
          @click="handleSideBarClick"
        />
      </template>
    </DxDrawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import DxDrawer, { type DxDrawerTypes } from 'devextreme-vue/drawer';
import DxScrollView from 'devextreme-vue/scroll-view';
import HeaderToolbar from '../components/header-toolbar.vue';
import SideNavMenu from '../components/side-nav-menu.vue';

const props = defineProps<{
  title: string;
  isXSmall: boolean;
  isLarge: boolean;
}>();

const route = useRoute();

const scrollViewRef = ref<any>(null);
const menuOpened = ref(props.isLarge);
const menuTemporaryOpened = ref(false);

function toggleMenu(e: any) {
  const pointerEvent = e.event;
  pointerEvent.stopPropagation();
  if (menuOpened.value) {
    menuTemporaryOpened.value = false;
  }
  menuOpened.value = !menuOpened.value;
}

function handleSideBarClick() {
  if (menuOpened.value === false) {
    menuTemporaryOpened.value = true;
  }
  menuOpened.value = true;
}

type DrawerPropsExt = DxDrawerTypes.Properties & {
  closeOnOutsideClick: boolean;
};

const drawerOptions = computed<DrawerPropsExt>(() => {
  const shaderEnabled = !props.isLarge;

  return {
    openedStateMode: props.isLarge ? 'shrink' : 'overlap',
    revealMode: props.isXSmall ? 'slide' : 'expand',
    minSize: props.isXSmall ? 0 : 60,
    maxSize: 250,
    closeOnOutsideClick: shaderEnabled,
    shading: shaderEnabled,
  };
});

watch(
  () => props.isLarge,
  () => {
    if (!menuTemporaryOpened.value) {
      menuOpened.value = props.isLarge;
    }
  }
);

watch(
  () => route.path,
  () => {
    if (menuTemporaryOpened.value || !props.isLarge) {
      menuOpened.value = false;
      menuTemporaryOpened.value = false;
    }
    scrollViewRef.value.instance.scrollTo(0);
  }
);
</script>

<style lang="scss">
.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.layout-header {
  z-index: 1501;
}
</style>
