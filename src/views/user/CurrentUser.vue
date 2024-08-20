<template>
  <div class="content-medium">
    <h1 class="mt-4">Your account</h1>
    <div class="container" v-if="store.currentUser">
      <div v-if="showEdit">
        <UserEdit :form="form" :updateUserAction="updateUserAction" :cancelUserAction="cancelUserAction"/>
      </div>
      <div v-else>
        <User :user="store.currentUser"/>
        <div class="mt-4 d-md-flex justify-content-md-end">
          <input type="button" value=" Edit " class="btn btn-warning" @click="editUser">
        </div>
      </div>
    </div>
    <div v-if="error" class="invalid-feedback" style="display: block;">
      {{ error }}
    </div>
  </div>
</template>

<script>
import User from '@/components/user/Element.vue'
import UserEdit from '@/components/user/Edit.vue'
import queryUser from '@/composable/queryUser'
import { store } from '../../store'

export default {
  name: 'CurrentUserView',
  components: { User, UserEdit },
  data () {
    return {
      form: {},
      showEdit: false,
      store,
    }
  },
  setup() {
    const { user, error, getUser, updateUser } = queryUser()

    getUser()

    return { user, error, updateUser }
  },
  methods: {
    async editUser() {
      this.showEdit = true
      this.form.username = this.store.currentUser.username
      this.form.first_name = this.store.currentUser.first_name
      this.form.last_name = this.store.currentUser.last_name
    },
    async updateUserAction(submitEvent) {
      submitEvent.preventDefault()
      this.updateUser(this.store.currentUser.id, this.form)
      this.showEdit = false
    },
    async cancelUserAction() {
      this.showEdit = false
    }
  }
}
</script>