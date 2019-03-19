<template>
  <div class="wrapper" v-if="machineTask">
    <page-title-bar :title="machineTask.Task.name" :showBack="true" />
    <div class="description green-desc" v-if="mode === 'check'">
      <font-awesome-icon icon="check-circle" />
      The task has been successfully accomplished. Congrats!<br />
    </div>
    <div class="description red-desc" v-if="mode === 'dismiss'">
      <font-awesome-icon icon="times-circle" />
      There have been issues!
    </div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <table>
      <tr>
        <td class="row-title">What to do:</td>
        <td>{{ machineTask.Task.description }}</td>
      </tr>
      <tr>
        <td class="row-title">If not OK:</td>
        <td>{{ machineTask.Task.repare }}</td>
      </tr>
      <tr>
        <td class="row-title">Machine:</td>
        <td>{{ machineTask.Machine.name }}</td>
      </tr>
    </table>
    <b-form @submit.prevent="saveLog" @reset.prevent="reset" v-if="showForm">
      <b-form-group id="commentLabel"
                    label="Comment:"
                    label-for="comment">
        <b-form-textarea id="comment"
                         :class="[(mode === 'check') ? 'green-textarea' : 'red-textarea']"
                         v-model="comment"
                         placeholder="Enter some notes"
                         rows="3"
                         :no-resize="true">
        </b-form-textarea>
      </b-form-group>
      <b-button type="submit" class="btn-outlined">Save</b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import MachineTaskService from '../services/MachineTaskService';
import LogService from '../services/LogService';

export default {
  name: 'WorkOnMachineTask',
  components: {
    PageTitleBar,
  },
  props: ['mode', 'machineTaskId'],
  data() {
    return {
      machineTask: null,
      comment: '',
      showForm: true,
      message: null,
    };
  },
  async created() {
    this.machineTask = (await MachineTaskService.machineTask(this.machineTaskId)).data.machineTask;
  },
  methods: {
    async saveLog() {
      try {
        await LogService.add({
          status: this.mode,
          machineTaskId: this.machineTask.id,
          comment: this.comment,
        });
        this.message = null;
        this.$router.push({
          path: '/',
        });
      } catch (err) {
        if (err.response && err.response.data.error !== '') {
          this.message = err.response.data.error;
        } else {
          this.message = 'No connection to the server. Please contact an admin.';
        }
      }
    },
    reset() {
      this.comment = '';
      this.showForm = false;
      this.$nextTick(() => { this.showForm = true; });
    },
  },
};
</script>

<style scoped>
table {
  width: 50%;
  margin: 0 0 20px 0;
  line-height: 2rem;
}

.row-title {
  vertical-align: top;
}

.description {
  font-size: 1.3rem;
}

.green-desc {
  color: darkgreen
}

.red-desc {
  color: crimson;
}

.green-textarea {
  border-color: darkgreen
}

.red-textarea {
  border-color: crimson;
}
</style>
