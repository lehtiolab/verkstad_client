<template>
  <b-nav class="sidebar" type="dark">
    <div class="navbar-header">
      <b-navbar-brand class="logo-wrapper" to="/">
        <font-awesome-icon icon="oil-can"/>
      </b-navbar-brand>
      <h5 class="title">Verkstad</h5>
      <h6 class="subtitle">Mass Spectrometer Maintenance</h6>
    </div>
    <div class="navbar-body">
      <b-nav-item to="/" exact>Home</b-nav-item>
      <b-nav-item to="/logbook">Logbook</b-nav-item>
      <b-nav-item to="/tasks">Tasks</b-nav-item>
      <b-nav-item to="/users">Users</b-nav-item>
      <b-nav-item to="/machines">Machines</b-nav-item>
    </div>
    <div class="navbar-user">
      <b-nav-text class="user-name" v-if="$store.state.isUserLoggedIn">
        {{ $store.state.user.name }}
      </b-nav-text>
      <b-nav-item to="/login" v-if="!$store.state.isUserLoggedIn">Login</b-nav-item>
      <b-nav-item @click="logout" v-if="$store.state.isUserLoggedIn">Logout</b-nav-item>
    </div>
    <div class="navbar-footer">
      <b-nav-text>Lehtiö Lab {{ year }}</b-nav-text>
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
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'home',
      });
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  align-items: flex-start;
  min-width: 250px;
  max-width: 250px;
  font-family: "Work Sans", sans-serif;
  background: #9dd5f8;
  color: #fffcf9;
}

.navbar-header {
  width: 90%;
  margin: 36px auto 0 auto;
  text-align: center;
}

.navbar-header a {
  color: #fffcf9;
}

.logo-wrapper {
  width: 140px;
  height: 140px;
  margin-left: 12px;
  font-size: 5rem;
  border: 5px solid #fffcf9;
  border-radius: 50%;
}

.title {
  margin-top: 10px;
  font-size: 2rem;
}

.subtitle {
  margin-top: 10px;
  font-size: 1.2rem;
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
  background-color: #25899f;
}

.navbar-user a {
  color: #fff;
}

.navbar-user a.active {
  background-color: #25899f;
}

.navbar-footer {
  align-self: flex-end;
  width: 90%;
  height: 50px;
  margin: 0 auto 0 auto;
  font-size: .8rem;
  text-align: center;
}
</style>
