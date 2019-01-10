<template>
  <div>
    <page-title-bar title="Users" />
    <b-button class="btn-outlined" to="/signup">Sign up</b-button>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';

export default {
  name: 'Users',
  components: {
    PageTitleBar,
  },
};
</script>

<style>

</style>
