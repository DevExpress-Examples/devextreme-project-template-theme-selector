<template>
  <div class="content-block">
    <footer class="footer">
      Copyright © 2011-{{ new Date().getFullYear() }} {{ appInfo.title }} Inc.
      <br>All trademarks or registered trademarks are property of their
      respective owners.
    </footer>
  </div>
</template>

<script setup lang="ts">
import appInfo from '@/app-info';
</script>

<style lang="scss">
@use "../themes/variables.base" as *;

.footer {
  display: block;

  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 24px;
}
</style>
