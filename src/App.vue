<template>
  <div id="app">
    <Sidebar />
    <b-container fluid class="wrapper">
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


<style>
@import url('https://fonts.googleapis.com/css?family=Work+Sans:200,400');

html, body {
  height: 100%;
}

button.btn-outlined, a.btn-outlined {
  margin: 5px 10px 5px 0;
  background-color: #9dd5f8;
  border: none;
}

button.btn-details {
  background-color: #9dd5f8;
  border: none;
}

button.btn-delete {
  background-color: crimson;
  border: none;
}

.description {
  min-height: 5px;
  margin: 13px 0 13px 0;
}

.alert-info {
  color: #000;
  background-color: #9dd5f8;
}

#app {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>
