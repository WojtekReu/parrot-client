<template>
  <div class="content-medium">
    <h1>Your account</h1>
    <div v-if="store.currentUser">
      <p>Username: {{ store.currentUser.username }}</p>
      <p>First name: <span v-if="store.currentUser.first_name">{{ store.currentUser.first_name }}</span></p>
      <p>Last name: <span v-if="store.currentUser.last_name">{{ store.currentUser.last_name }}</span></p>
    </div>
    <div v-if="error" class="invalid-feedback" style="display: block;">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { store } from '../../store'

export default {
  name: 'CurrentUserView',
  data () {
    return {
      error: null,
      store,
    }
  },
  mounted() {
    fetch(
      `${process.env.VUE_APP_API_URL}/users/whoami`,
      {
        credentials: "include",
      }
    )
    .then(response => {
      let data = response.json()
      if (response.status == 401) {
        window.location = "/logout"
      }
      return data
    })
    .then(data => {
      if (data.detail !== undefined && data.detail !== "") {
        this.error = data.detail
      } else {
        this.store.currentUser = data
      }
    })
    .catch(err => this.error = err.message)
  }
}
</script>