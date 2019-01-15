<template>
  <li class="task-card">
    <div class="task-color-bar"
         :class="[(data.dayDiff > -1) ? 'bar-red' : (data.dayDiff > -7)
         ? 'bar-yellow' : 'bar-blue']">
    </div>
    <div class="task-body">
      <h1>{{ data.machineTask.Task.name }}</h1>
      <div class="task-machine">{{ data.machineTask.Machine.name }}</div>
      <div class="task-latest">
        Latest: {{ data.nextDate.split('T')[0] }}
        ({{ (Math.abs(data.dayDiff) &lt; 1)
           ? 'less than one day '
           : Math.ceil(Math.abs(data.dayDiff)) + ' days ' }} left)
      </div>
    </div>
    <b-button class="dismiss-task"
              :class="[(data.dayDiff > -1)
              ? 'bar-red' : (data.dayDiff > -7)
              ? 'bar-yellow' : 'bar-blue']"
              @click.stop="dismissTask">
      <font-awesome-icon icon="times-circle"/>
    </b-button>
    <b-button class="check-task"
              :class="[(data.dayDiff > -1)
              ? 'bar-red' : (data.dayDiff > -7)
              ? 'bar-yellow' : 'bar-blue']"
              @click.stop="checkTask">
      <font-awesome-icon icon="check-circle"/>
    </b-button>
  </li>
</template>

<script>
export default {
  name: 'Login',
  props: ['data'],
  methods: {
    checkTask() {
      this.$router.push({
        name: 'workonmachinetask',
        params: {
          mode: 'check',
          machineTaskId: this.data.machineTask.id,
        },
      });
    },
    dismissTask() {
      this.$router.push({
        name: 'workonmachinetask',
        params: {
          mode: 'dismiss',
          machineTaskId: this.data.machineTask.id,
        },
      });
    },
  },
};
</script>

<style scoped>
li.task-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 0 10px 10px 0;
}

.task-color-bar {
  width: 35px;
  height: 100%;
  border-radius: 7px 0 0 7px;
}

.bar-red {
  background-color: lightcoral;
}

.bar-yellow {
  background-color: darkkhaki;
}

.bar-blue {
  background-color: #9dd5f8;
}

.task-body {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  background-color: rgb(233, 233, 233);
}

.task-body h1 {
  margin: 0;
  font-family: "Work Sans";
  font-size: 1.3rem;
  font-weight: 400;
}

button.dismiss-task {
  width: 60px;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
  border: none;
  border-radius: 0;
  background-color: lightcoral;
}

button.check-task {
  width: 60px;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
  border-radius: 0 7px 7px 0;
  border: none;
  background-color: darkseagreen;
}
</style>
