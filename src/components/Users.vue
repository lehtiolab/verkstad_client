<template>
  <div>
    <page-title-bar title="Users" />
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-table class="user-table"
             :items="users"
             :fields="fields"
             responsive
             v-if="users.length > 0">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="deleteUserRequest(row.item)">
          Delete
        </b-button>
      </template>
    </b-table>
    <b-button class="btn-outlined"
              to="/login"
              v-if="!$store.state.user && this.users.length > 0">
      Login
    </b-button>
    <b-button class="btn-outlined"
              to="/signup">
      Add user
    </b-button>

    <b-modal id="modalQuestion" @ok="deleteUser" title="Delete user?">
      <p>Do you really want to kick out this user?</p>
      <p>{{ modalQuestion.userName }}<br />
         {{ modalQuestion.userEMail }}</p>
    </b-modal>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import AuthenticationService from '../services/AuthenticationService';

export default {
  name: 'Users',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      message: null,
      users: [],
      fields: {
        name: {
          label: 'Name',
          sortable: true,
        },
        email: {
          label: 'eMail',
        },
        createdAt: {
          label: 'Created',
          sortable: true,
          formatter: (value) => {
            const d = new Date(value);
            return [
              d.getFullYear(),
              ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1),
              (d.getDate() < 10 ? '0' : '') + d.getDate(),
            ].join('-');
          },
        },
        actions: {
          label: '',
          sortable: false,
        },
      },
      modalQuestion: {
        userName: '',
        userEMail: '',
      },
    };
  },
  async mounted() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.users = (await AuthenticationService.index()).data;
    },
    deleteUserRequest(item) {
      this.modalQuestion.userName = item.name;
      this.modalQuestion.userEMail = item.email;
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    async deleteUser() {
      try {
        await AuthenticationService.deleteUser({
          email: this.modalQuestion.userEMail,
        });
        if (this.$store.state.user
            && (this.modalQuestion.userEMail === this.$store.state.user.email)) {
          this.logout();
        }
        this.loadUsers();
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style>

</style>
