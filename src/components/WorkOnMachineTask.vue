<template>
  <div>
    <page-title-bar :title="mode" :showBack="true"/>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
// import TaskService from '../services/TaskService';

export default {
  name: 'WorkOnMachineTask',
  components: {
    PageTitleBar,
  },
  props: ['mode', 'machineTaskId'],
  data() {
    return {
      machineTask: null,
    };
  },
};
</script>

<style>

</style>
