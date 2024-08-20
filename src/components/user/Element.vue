<template>
  <p class="row mt-4"><span class="col">Username: </span><span class="col">{{ user.username }}</span></p>
  <p class="row mt-4"><span class="col">First name: </span><span class="col" v-if="user.first_name">{{ user.first_name }}</span></p>
  <p class="row mt-4"><span class="col">Last name: </span><span class="col" v-if="user.last_name">{{ user.last_name }}</span></p>
</template>

<script>
export default {
    props: ['user'],
}
</script>