<template>
  <div class="side-nav-inner-toolbar dx-theme-background-color">
    <DxDrawer
      class="drawer"
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
      <div class="container dx-theme-background-color">
        <HeaderToolbar
          :menu-toggle-enabled="headerMenuTogglerEnabled"
          :toggle-menu-func="toggleMenu"
        />
        <DxScrollView
          ref="scrollViewRef"
          class="layout-body with-footer"
        >
          <slot/>
          <slot name="footer"/>
        </DxScrollView>
      </div>
      <template #menuTemplate>
        <SideNavMenu
          :compact-mode="!menuOpened"
          @click="handleSideBarClick"
        >
          <DxToolbar id="navigation-header">
            <DxItem
              v-if="!isXSmall"
              location="before"
              css-class="dx-theme-text-color"
            >
              <template #default>
                <DxButton
                  icon="menu"
                  styling-mode="text"
                  @click="toggleMenu"
                />
              </template>
            </DxItem>
            <DxItem
              location="before"
              css-class="header-title dx-toolbar-label"
            >
              <template #default>
                <div>{{ title }}</div>
              </template>
            </DxItem>
          </DxToolbar>
        </SideNavMenu>
      </template>
    </DxDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import DxButton, { type DxButtonTypes } from 'devextreme-vue/button';
import DxDrawer, { type DxDrawerTypes } from 'devextreme-vue/drawer';
import DxScrollView from 'devextreme-vue/scroll-view';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';
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

function toggleMenu(e: DxButtonTypes.ClickEvent): void {
  const pointerEvent = e.event;
  pointerEvent?.stopPropagation();
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
    maxSize: props.isXSmall ? 250 : undefined,
    closeOnOutsideClick: shaderEnabled,
    shading: shaderEnabled,
  };
});

const headerMenuTogglerEnabled = computed(() => {
  return props.isXSmall;
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
.side-nav-inner-toolbar {
  width: 100%;
}

#navigation-header {
  @use "../themes/variables.additional" as *;
  background-color: $base-accent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .menu-button .dx-icon {
    color: $base-text-color;
  }

  .screen-x-small & {
    padding-left: 20px;
  }

  .dx-theme-generic & {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
