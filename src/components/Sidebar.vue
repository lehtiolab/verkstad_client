<template>
  <b-nav class="sidebar">
    <div class="navbar-header">
      <b-navbar-brand id="fullScreenBtn" class="logo-wrapper" @click="fullScreen">
        <font-awesome-icon icon="oil-can" />
      </b-navbar-brand>
      <h5 class="title">Verkstad</h5>
      <h6 class="subtitle">Mass Spectrometer Maintenance</h6>
    </div>
    <div class="navbar-body">
      <b-nav-item to="/" exact>Home</b-nav-item>
      <b-nav-item to="/logbook">Logbook</b-nav-item>
      <b-nav-item to="/tasks">Tasks</b-nav-item>
      <b-nav-item to="/machines">Machines</b-nav-item>
      <b-nav-item to="/users">Users</b-nav-item>
    </div>
    <div class="navbar-user">
      <b-nav-text class="user-name" v-if="$store.state.user">
        {{ $store.state.user.name }}
      </b-nav-text>
      <b-nav-item to="/login" v-if="!$store.state.user">Login</b-nav-item>
      <b-nav-item @click="logout" v-if="$store.state.user">Logout</b-nav-item>
    </div>
    <div class="navbar-footer">
      <b-nav-text>
        <router-link class="link-about" to="/about">Lehtiö Lab {{ year }}</router-link>
      </b-nav-text>
    </div>
  </b-nav>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
  mounted() {
    document.getElementById('fullScreenBtn').click();
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    fullScreen() {
      document.documentElement.webkitRequestFullScreen();
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  align-items: flex-start;
  width: 30%;
  max-width: 300px;
  font-family: "Work Sans", sans-serif;
  font-weight: 200;
  background: #9dd5f8;
  color: #fffcf9;
}

.navbar-header {
  width: 90%;
  margin: 1.6rem auto 0 auto;
  text-align: center;
}

.navbar-header a {
  color: #fffcf9;
}

.logo-wrapper {
  width: 11rem;
  height: 11rem;
  margin-left: 12px;
  font-size: 6.5rem;
  border: 0.3rem solid #fffcf9;
  border-radius: 50%;
}

.title {
  margin-top: 5%;
  font-size: 2.5rem;
}

.subtitle {
  margin-top: 5%;
  font-size: 1.1rem;
}

.navbar-body {
  width: 100%;
  text-align: center;
}

.navbar-body a {
  font-size: 1.8rem;
  color: #fff;
}

.navbar-body a.active {
  background-color: #25899f;
}

.navbar-user {
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
}

.navbar-user .user-name {
  width: 100%;
  background-color: #4c8fdb;
}

.navbar-user a {
  color: #fff;
}

.navbar-user a.active {
  background-color: #25899f;
}

.navbar-footer {
  align-self: flex-end;
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
}

a.link-about {
  color: #fff;
  text-decoration: none;
}
</style>
