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
    <p class="text-left mt-4">Definitions from NLTK wordnet</p>
    <ol>
      <li v-for="synset in synsetsData.synsets" :key="synset.name" class="word-element">
        {{ synset.name }} - {{ synset.definition }}<br>
        <span class="translation">{{ synset.pol }}</span>
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
      synsetsData: {},
    }
  },
  methods: {
    clear() {
      this.wordsFilter = '',
      this.synsetsData = {}
    },
    async searchWords() {
      if (this.wordsFilter) {
        await fetch(`${process.env.VUE_APP_API_URL}/translation/synsets/${this.wordsFilter}`)
          .then(response => response.json())
          .then(data => this.synsetsData = data)
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
.translation {
  font-style: italic;
  color: #822;
}
</style>