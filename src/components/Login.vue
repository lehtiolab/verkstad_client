<template>
  <div class="wrapper">
    <page-title-bar title="Login" :showBack="true" />
    <div class="description">Come in and take care of your mass specs.</div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-form @submit.prevent="login" @reset.prevent="reset" v-if="showForm">
      <b-form-group id="emailLabel"
                    label="eMail address:"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      v-model="user.email"
                      required
                      placeholder="Enter eMail">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordLabel"
                    label="Password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="user.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn-outlined">Login</b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import AuthenticationService from '../services/AuthenticationService';

export default {
  name: 'Login',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      showForm: true,
      message: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.user.email,
          password: this.user.password,
        });
        this.$store.dispatch('setUser', response.data);
        this.message = null;
        this.$router.push({
          name: this.$store.state.route.from.name,
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
      this.user.email = '';
      this.user.name = '';
      this.user.password = '';
      this.message = null;
      this.showForm = false;
      this.$nextTick(() => { this.showForm = true; });
    },
  },
};
</script>

<style scoped>
</style>
