<template>
  <div id="app">
    <Sidebar />
    <b-container fluid>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
};
</script>


<style scoped>
#app {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>
