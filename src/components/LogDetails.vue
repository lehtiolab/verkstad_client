<template>
  <div class="log-details">
    <page-title-bar :title="log.MachineTask.Task.name" showBack="true" v-if="log" />
    <page-title-bar title="Error" showBack="true" v-if="!log" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <table class="log-details-table" v-if="log">
      <tr>
        <td class="row-title">Description</td>
        <td>{{ log.MachineTask.Task.description }}</td>
      </tr>
      <tr>
        <td class="row-title">If not OK</td>
        <td>{{ log.MachineTask.Task.repare }}</td>
      </tr>
      <tr>
        <td class="row-title">Interval</td>
        <td>
          {{ log.MachineTask.Task.interval + ((log.MachineTask.Task.interval === 1)
             ? ' day' : ' days')}}
        </td>
      </tr>
      <tr>
        <td class="row-title">Machine</td>
        <td>{{ log.MachineTask.Machine.name }}</td>
      </tr>
      <tr>
        <td class="row-title">Done</td>
        <td>{{ log.createdAt.split('T')[0] }}</td>
      </tr>
      <tr>
        <td class="row-title">By</td>
        <td>{{ log.User.name }}</td>
      </tr>
      <tr>
        <td class="row-title">Comment</td>
        <td>{{ log.comment }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import LogService from '../services/LogService';

export default {
  name: 'LogDetails',
  components: {
    PageTitleBar,
  },
  props: ['logId'],
  data() {
    return {
      message: null,
      log: null,
    };
  },
  async mounted() {
    try {
      this.log = (await LogService.log(this.logId)).data;
    } catch (err) {
      this.message = err.response.data.error;
    }
  },
};
</script>

<style scoped>
table {
  width: 80%;
  line-height: 2rem;
}

.row-title {
  width: 17%;
  font-weight: bold;
  vertical-align: top;
}
</style>
