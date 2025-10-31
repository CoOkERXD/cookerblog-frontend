<template>
  <div id="app" :key="$route.fullPath">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>