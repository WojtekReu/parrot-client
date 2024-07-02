<template>
  <div class="content-medium">
    <h1>Your account</h1>
    <div v-if="store.currentUser">
      <p>Username: {{ store.currentUser.username }}</p>
      <p>First name: <span v-if="store.currentUser.first_name">{{ store.currentUser.first_name }}</span></p>
      <p>Last name: <span v-if="store.currentUser.last_name">{{ store.currentUser.last_name }}</span></p>
    </div>
  </div>
</template>

<script>
import { store } from '../../store'

export default {
  name: 'CurrentUserView',
  data () {
    return {
      store,
    }
  },
  mounted() {
    fetch(
      `${process.env.VUE_APP_API_URL}/users/users/whoami`,
      {
        credentials: "include",
      }
    )
    .then(response => response.json())
    .then(data => this.store.currentUser = data)
    .catch(err => this.error = err.message)
  }
}
</script>