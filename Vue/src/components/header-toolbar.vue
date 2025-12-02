<template>
  <header class="header-component">
    <DxToolbar class="header-toolbar">
      <DxItem
        :visible="menuToggleEnabled"
        location="before"
        css-class="menu-button"
      >
        <template #default>
          <DxButton
            icon="menu"
            styling-mode="text"
            @click="toggleMenuFunc"
          />
        </template>
      </DxItem>

      <DxItem
        v-if="title"
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <div>{{ title }}</div>
      </DxItem>

      <DxItem
        location="after"
      >
        <ThemeSelector/>
      </DxItem>
      <DxItem
        location="after"
        locate-in-menu="auto"
        menu-item-template="menuUserItem"
      >
        <template #default>
          <div>
            <DxButton
              class="user-button authorization"
              :width="210"
              height="100%"
              styling-mode="text"
            >
              <UserPanel
                :email="email"
                :menu-items="userMenuItems"
                menu-mode="context"
              />
            </DxButton>
          </div>
        </template>
      </DxItem>

      <template #menuUserItem>
        <UserPanel
          class="dx-theme-text-color"
          :email="email"
          :menu-items="userMenuItems"
          menu-mode="list"
        />
      </template>
    </DxToolbar>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DxButton, { type DxButtonTypes } from 'devextreme-vue/button';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';
import auth from '../auth';
import UserPanel from './user-panel.vue';
import ThemeSelector from './theme-selector.vue';

defineProps<{
  menuToggleEnabled: boolean;
  title?: string;
  toggleMenuFunc: (e: DxButtonTypes.ClickEvent) => void;
  logOutFunc?: Function;
}>();

const router = useRouter();
const route = useRoute();

const email = ref('');
auth.getUser().then((e) => (email.value = e.data?.email || ''));

function onLogoutClick() {
  auth.logOut();
  router.push({
    path: '/login-form',
    query: { redirect: route.path },
  });
}

function onProfileClick() {
  router.push({
    path: '/profile',
    query: { redirect: route.path },
  });
}

const userMenuItems = [
  {
    text: 'Profile',
    icon: 'user',
    onClick: onProfileClick,
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: onLogoutClick,
  },
];
</script>

<style lang="scss">
@use "../themes/variables.base" as *;
@use "../dx-styles.scss" as *;

.header-component {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .dx-toolbar .dx-toolbar-item.menu-button > .dx-toolbar-item-content .dx-icon {
    color: $base-accent;
  }
}

.dx-toolbar.header-toolbar .dx-toolbar-items-container .dx-toolbar-after {
  padding: 0 40px;

  .screen-x-small & {
    padding: 0 20px;
  }
}

.dx-toolbar .dx-toolbar-item.dx-toolbar-button.menu-button {
  width: $side-panel-min-width;
  text-align: center;
  padding: 0;
}

.header-title .dx-item-content {
  padding: 0;
  margin: 0;
}

.dx-theme-generic {
  .dx-toolbar {
    padding: 10px 0;
  }

  .user-button > .dx-button-content {
    padding: 3px;
  }
}
</style>
