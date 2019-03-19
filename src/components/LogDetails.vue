<template>
  <div class="wrapper">
    <page-title-bar :title="log.task" :showBack="true" v-if="log" />
    <page-title-bar title="Error" showBack="true" v-if="!log" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <table class="log-details-table" v-if="log">
      <tr>
        <td class="row-title">Satus:</td>
        <td>
          <font-awesome-icon icon="check-circle"
                             style="color: darkseagreen"
                             v-if="log.status === 'check'" />
          <font-awesome-icon icon="times-circle"
                             style="color: lightcoral"
                             v-if="log.status === 'dismiss'" />
        </td>
      </tr>
      <tr>
        <td class="row-title">Description:</td>
        <td>{{ log.description }}</td>
      </tr>
      <tr>
        <td class="row-title">If not OK:</td>
        <td>{{ log.repare }}</td>
      </tr>
      <tr>
        <td class="row-title">Interval:</td>
        <td>
          {{ log.interval + ((log.interval === 1)
             ? ' day' : ' days')}}
        </td>
      </tr>
      <tr>
        <td class="row-title">Machine:</td>
        <td>{{ log.machine }}</td>
      </tr>
      <tr>
        <td class="row-title">Done:</td>
        <td>{{ log.createdAt.split('T')[0] }}</td>
      </tr>
      <tr>
        <td class="row-title">By:</td>
        <td>{{ log.user }}</td>
      </tr>
      <tr class="spacer">
      </tr>
      <tr>
        <td class="row-title">Comment:</td>
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
  async created() {
    try {
      this.log = (await LogService.log(this.logId)).data;
      this.message = null;
    } catch (err) {
      if (err.response && err.response.data.error !== '') {
        this.message = err.response.data.error;
      } else {
        this.message = 'No connection to the server. Please contact an admin.';
      }
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
  min-width: 100px;
  font-weight: bold;
  vertical-align: top;
}

.spacer {
  height: 2rem;
}
</style>
