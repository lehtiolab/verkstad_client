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
        <b-button size="sm" class="mr-2 btn-delete" @click.stop="deleteUserRequest(row.item)">
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
            return d.toISOString().split('T')[0];
          },
        },
        actions: {
          label: '',
          sortable: false,
        },
      },
      modalQuestion: {
        userId: null,
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
      this.modalQuestion.userId = item.id;
      this.modalQuestion.userName = item.name;
      this.modalQuestion.userEMail = item.email;
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    async deleteUser() {
      try {
        await AuthenticationService.deleteUser(this.modalQuestion.userId);
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
