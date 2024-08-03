<template>
  <h1>Books</h1>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-if="books.items && books.items.length > 0">
    <table class="book-list">
      <tr>
        <th>Count</th>
        <th>Title</th>
        <th>Author</th>
        <th>Sentences</th>
        <th>Words</th>
        <th>Reading</th>
      </tr>
      <tr v-for="(book, index) in books.items" :key="book.id">
        <td>{{ index + 1 }}</td>
        <td><router-link :to="{ name: 'book', params: { id: book.id }}">{{ book.title }}</router-link></td>
        <td>{{ book.author }}</td>
        <td>{{ book.sentences_count }}</td>
        <td>{{ book.words_count }}</td>
        <td><input type="checkbox" :value="book.id" v-model="currentlyReading" @change="updateBook"></td>
      </tr>
    </table>
  </div>
  <div v-else>
    You do not have any book yet.
  </div>
  <router-link to="/book/add">Add book</router-link>
</template>

<script>
import getBooks from '@/composable/getBooks'
import getCurrentlyReading from '@/composable/getCurrentlyReading'
import updateCurrentlyReading from '@/composable/updateCurrentlyReading'
import Book from '@/components/book/Element'

export default {
  name: 'books',
  components: { Book },
  data() {
    return {
      currentlyReading: [],
      update: null,
    }
  },
  setup() {
    const { books, error, load } = getBooks(true)
    
    load()

    return { books, error }
  },
  mounted() {
    const { currentlyReading, error, loadCurrentlyReading } = getCurrentlyReading()
    loadCurrentlyReading()
    this.currentlyReading = currentlyReading
    this.error = error
    const { update } = updateCurrentlyReading()
    this.update = update
  },
  methods: {
    async updateBook(event) {
      this.update(event.target.value, event.target.checked)
    }
  }
}
</script>

<style>
.book-list {
  margin: 0 auto;
}
</style>