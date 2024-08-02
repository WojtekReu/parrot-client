<template>
  <div class="content-medium">
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
      <div v-if="message.type === 'error'" class="invalid-feedback" style="display: block;">{{ message.text }}</div>
      <div v-if="message.type === 'success'" class="valid-feedback" style="display: block;">{{ message.text }}</div>
      <div class="d-grid gap-2 mt-4">
        <input type="submit" value="save" class="btn btn-primary">
      </div>
    </form>
    <div v-if="book">
      <p class="message2">Load book content for {{ book.title }} - {{ book.author }}</p>
      <div class="form-row">
        <label for="bookContent" class="form-label mt-4 required">book file</label>
        <input type="file" name="bookContent" @change="loadBookContentAction" class="form-control">
      </div>
      <div v-if="message2.type === 'error'" class="invalid-feedback" style="display: block;">{{ message2.text }}</div>
      <div v-if="message2.type === 'success'" class="valid-feedback" style="display: block;">{{ message2.text }}</div>
    </div>
  </div>
</template>

<script>
import addBook from '@/composable/addBook'
import loadBookContentAction from '@/composable/loadBookContent'

export default {
  name: 'addBook',
  data() {
    return {
      book: null,
      form: {
        title: null,
        author: null
      },
      message: {
        text: null,
        type: null,
      },
      message2: {
        text: null,
        type: null,
      },
    }
  },
  methods: {
    async addBookAction(submitEvent) {
      submitEvent.preventDefault()
      const { book, message, load } = addBook(this.form)
      load()
      this.message = message
      this.book = book
    },
    async loadBookContentAction(event) {
      const { message, load } = loadBookContentAction(this.book.id, event.target.files[0])
      load()
      this.message2 = message
    }
  }
}
</script>

<style>
.message2 {
  margin-top: 40px;
}
</style>