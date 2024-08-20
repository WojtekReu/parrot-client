<template>
  <div class="content-medium">
    <form class="form-edit" @submit="updateUserAction">
      <div class="form-row">
        <label for="username" class="col form-label mt-4 required">Username:</label>
        <input type="text" name="username" v-model="form.username" class="col form-control">
      </div>
      <div class="form-row">
        <label for="firstName" class="col form-label mt-4 required">First name:</label>
        <input type="text" name="firstName" v-model="form.first_name" class="col form-control">
      </div>
      <div class="form-row">
        <label for="lastName" class="col form-label mt-4 required">Last name:</label>
        <input type="text" name="lastName" v-model="form.last_name" class="col form-control">
      </div>
      <div class="gap-2 mt-4 d-md-flex justify-content-md-end">
        <input type="submit" value="save" class="btn btn-primary me-md-2">
        <input type="button" value="cancel" class="btn btn-secondary" @click="cancelUserAction">
      </div>
    </form>
  </div>
</template>

<script>
export default {
    props: ['form', 'updateUserAction', 'cancelUserAction'],
}
</script>

<style>
.form-edit label.form-label {
  width: 40%;
  text-align: center;
}
form-edit input.form-control {
  display: inline-block;
  width: 60%;
}
</style>