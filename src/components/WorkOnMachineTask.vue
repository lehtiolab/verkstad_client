<template>
  <div v-if="machineTask">
    <page-title-bar :title="machineTask.Task.name" :showBack="true" />
    <div class="description" v-if="mode === 'check'">
      The task has been successfully accomplished. Congrats!<br />
    </div>
    <div class="description" v-if="mode === 'dismiss'">
      There have been issues and the task cannot be checked.
    </div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <table>
      <tr>
        <td>Task description:</td>
        <td>{{ machineTask.Task.description }}</td>
      </tr>
      <tr>
        <td>Machine:</td>
        <td>{{ machineTask.Machine.name }}</td>
      </tr>
    </table>
    <b-form @submit="saveLog" @reset="reset" v-if="showForm">
      <b-form-group id="commentLabel"
                    label="Comment:"
                    label-for="comment">
        <b-form-textarea id="comment"
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
  async mounted() {
    this.machineTask = (await MachineTaskService.machineTask(this.machineTaskId)).data.machineTask;
  },
  methods: {
    async saveLog() {
      try {
        await LogService.add({
          mode: this.mode,
          machineTaskId: this.machineTask.id,
          comment: this.comment,
          userId: null,
        });
        this.$router.push({
          path: '/',
        });
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
    reset(evt) {
      evt.preventDefault();
      this.comment = '';
      this.showForm = false;
      this.$nextTick(() => { this.showForm = true; });
    },
  },
};
</script>

<style scoped>
.description {
  margin: 0 0 20px 0;
  font-size: 1.2rem;
}

table {
  width: 20%;
  margin: 0 0 20px 0;
  line-height: 2rem;
}

form {
  max-width: 500px;
}
</style>
