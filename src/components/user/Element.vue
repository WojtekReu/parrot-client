<template>
  <p>Username: {{ user.username }}</p>
  <p>First name: <span v-if="user.first_name">{{ user.first_name }}</span></p>
  <p>Last name: <span v-if="user.last_name">{{ user.last_name }}</span></p>
</template>

<script>
export default {
    props: ['user'],
}
</script>