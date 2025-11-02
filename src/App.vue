<script setup lang="ts">
import FooterView from './components/layout/FooterView.vue'
import HeaderView from './components/layout/HeaderView.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <HeaderView></HeaderView>
    <div class="flex-grow-1">
      <router-view></router-view>
    </div>
    <FooterView></FooterView>
  </div>
</template>
