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


<style>
@import url('https://fonts.googleapis.com/css?family=Work+Sans:200,400');

html, body {
  height: 100%;
  font-size: 15px;
}

@media(max-width: 1200px) {
  html, body {
    font-size: 11px;
  }
}

@media(max-width: 980px) {
  html, body {
    font-size: 10px;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
}

form {
  max-width: 40%;
  overflow-y: scroll;
  padding-bottom: 10px;
}

button.btn-outlined, a.btn-outlined {
  margin: 0 0 5px 5px;
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
  margin: 2% 0 2% 0;
}

.alert-info {
  color: #000;
  background-color: #9dd5f8;
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
