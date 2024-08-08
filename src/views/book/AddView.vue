<template>
  <div class="content-medium">
    <h1>Load book content</h1>
    <p>Prepare a txt file with the content of your book. Loading may take some time - be patient.</p>
    <form @submit="addBookAction">
      <div class="form-row">
        <label for="title" class="form-label mt-4 required">title</label>
        <input type="text" name="title" v-model="form.title" class="form-control">
      </div>
      <div class="form-row">
        <label for="author" class="form-label mt-4 required">author</label>
        <input type="text" name="author" v-model="form.author" class="form-control">
      </div>
      <div class="d-grid gap-2 mt-4">
        <input type="submit" value="save" class="btn btn-primary">
      </div>
    </form>
    <div class="message">
      <div v-if="message.type === 'error'" class="invalid-feedback" style="display: block;">{{ message.text }}</div>
      <div v-if="message.type === 'success'" class="valid-feedback" style="display: block;">{{ message.text }}</div>
      <div v-if="message.type === 'loading'" class="valid"><img src="/img/Loading_icon.gif" class="loadingIcon" width="120px" height="80px">{{ message.text }}</div>
    </div>
    <div v-if="book">
      <div class="form-row">
        <label for="bookContent" class="form-label mt-4 required">book file</label>
        <input type="file" name="bookContent" @change="uploadAction" class="form-control" :disabled="inputDisabled">
      </div>
    </div>
  </div>
</template>

<script>
import loadAddBook from '@/composable/addBook'
import loadBookContent from '@/composable/loadBookContent'

export default {
  name: 'addBook',
  setup() {
    const { book, message, addBook } = loadAddBook()
    const { message2, uploadBook } = loadBookContent()

    return { book, message, message2, addBook, uploadBook }
  },
  data() {
    return {
      form: {
        title: null,
        author: null
      },
      inputDisabled: true
    }
  },
  methods: {
    async addBookAction(submitEvent) {
      submitEvent.preventDefault()
      this.addBook(this.form)
      this.inputDisabled = false
    },
    async uploadAction(event) {
      this.uploadBook(this.book.id, event.target.files[0])
      this.inputDisabled = true
      this.message = this.message2
    }
  }
}
</script>

<style>
.message {
  margin-top: 30px;
}
</style>