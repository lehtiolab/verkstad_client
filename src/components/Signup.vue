<template>
  <div class="wrapper">
    <page-title-bar title="Sign up" :showBack="true" />
    <div class="description">Register a new user for this app by submitting the form below.</div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-form @submit.prevent="signUp" @reset.prevent="reset" autocomplete="off" v-if="showForm">
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
      <b-form-group id="nameLabel"
                    label="Name:"
                    label-for="name">
        <b-form-input id="name"
                      type="text"
                      v-model="user.name"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordLabel"
                    label="Password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="user.password"
                      required
                      placeholder="Enter password (>3 characters)">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn-outlined">Sign up</b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import AuthenticationService from '../services/AuthenticationService';

export default {
  name: 'Signup',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      user: {
        email: '',
        name: '',
        password: '',
      },
      showForm: true,
      message: null,
    };
  },
  methods: {
    async signUp() {
      try {
        await AuthenticationService.signUp({
          email: this.user.email,
          name: this.user.name,
          password: this.user.password,
        });
        this.message = null;
        this.$router.push({
          path: '/users',
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
