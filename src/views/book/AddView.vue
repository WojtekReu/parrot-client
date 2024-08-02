<template>
  <div id="container" class="content-medium">
    <h1>Add book</h1>
    <form @submit="addBookAction">
      <div class="form-row">
        <label for="title" class="form-label mt-4 required">title</label>
        <input type="text" name="title" v-model="form.title" class="form-control">
      </div>
      <div class="form-row">
        <label for="author" class="form-label mt-4 required">author</label>
        <input type="text" name="author" v-model="form.author" class="form-control">
      </div>
      <div v-for="error in errors" class="invalid-feedback" style="display: block;">
        {{ error }}
      </div>
      <div v-if="message" class="valid-feedback" style="display: block;">{{ message }}</div>
      <div class="d-grid gap-2 mt-4">
        <input type="submit" value="save" class="btn btn-primary">
      </div>
    </form>
  </div>
</template>

<script>
import addBook from '@/composable/addBook'

export default {
  name: 'addBook',
  data() {
    return {
      errors: [],
      form: {
        title: null,
        author: null
      },
      message: null,
    }
  },
  methods: {
    async addBookAction(submitEvent) {
      submitEvent.preventDefault()
      this.errors = []
      const { message, error, load } = addBook(this.form)
      load()
      if (error.value) {
        this.errors.push(error)
      } else {
        this.form.title = null
        this.form.author = null
        this.message = message
      }
    }
  }
}
</script>

<style>

</style>