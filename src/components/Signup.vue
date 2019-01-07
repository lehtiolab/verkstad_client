<template>
  <div>
    <h1>Sign up</h1>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async signUp() {
      const response = await AuthenticationService.signUp({
        email: this.email,
        password: this.password,
      });
      console.log(response.data);
    },
  },
};
</script>

<style>

</style>
