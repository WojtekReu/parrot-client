<template>
  <div class="content-medium">
    <h1>Words</h1>
    <div class="form-row">
      <label for="searchWord" class="form-label mt-4 required">search word</label>
      <input type="text" name="searchWord" v-model="wordsFilter" class="form-control"  @keyup="searchWords()">
    </div>
    <div class="form-check-reverse mt-4">
      <input type="button" value="clear" class="btn btn-secondary" @click="clear">
    </div>
    <div v-if="error" class="invalid-feedback" style="display: block;">
      {{ error }}
    </div>
    <ol>
      <li v-for="word in wordsList" :key="word.id" class="word-element">
        {{ word.lem }}, {{ word.pos }}, {{ word.synset }}, {{ word.declination }} - {{ word.definition }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'WordsList',
  data() {
    return {
      error: '',
      wordsFilter: '',
      wordsList: []
    }
  },
  methods: {
    clear() {
      this.wordsFilter = '',
      this.wordsList = []
    },
    async searchWords() {
      if (this.wordsFilter) {
        await fetch(`${process.env.VUE_APP_API_URL}/words/find/${this.wordsFilter}`)
          .then(response => response.json())
          .then(data => this.wordsList = data)
          .catch(err => this.error = err.message)
      }
    }
  }
}
</script>

<style>
.word-element {
  text-align: left;
}
</style>