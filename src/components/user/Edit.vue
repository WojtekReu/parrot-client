<template>
  <div class="content-medium">
    <form @submit="updateUserAction">
      <div class="form-row">
        <label for="username" class="form-label mt-4 required">Username</label>
        <input type="text" name="username" v-model="form.username" class="form-control">
      </div>
      <div class="form-row">
        <label for="firstName" class="form-label mt-4 required">First name</label>
        <input type="text" name="firstName" v-model="form.first_name" class="form-control">
      </div>
      <div class="form-row">
        <label for="lastName" class="form-label mt-4 required">Last name</label>
        <input type="text" name="lastName" v-model="form.last_name" class="form-control">
      </div>
      <div class="d-grid gap-2 mt-4">
        <input type="submit" value="save" class="btn btn-primary">
      </div>
    </form>
  </div>
</template>

<script>
export default {
    props: ['form', 'updateUserAction'],
}
</script>