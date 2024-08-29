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
    <p class="keyword">word: {{ wordsFilter }}</p>
    <div class="text-center">Engish - Polish Piotrowski+Saloni/FreeDict dictionary</div>
    <div v-if="translation && translation.definition" class="text-left small">
      <div v-for="line in translation.definition.split('\n')">
        {{ line }}
      </div>
    </div>
    <p class="text-center mt-4">NLTK WordNet definitions</p>
    <ol>
      <li v-for="synset in synsets.synsets" :key="synset.name" class="word-element">
        {{ synset.name }} - {{ synset.definition }}<br>
        <span class="translation">{{ synset.pol }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import findTranslation from '@/composable/findTranslation'
import findSynsets from '@/composable/synsets'
export default {
  name: 'words',
  data() {
    return {
      wordsFilter: '',
    }
  },
  setup() {
    const { translation, error, loadFindTranslation } = findTranslation()
    const { synsets, error2, loadFindSynsets } = findSynsets()
    
    return { translation, synsets, error, loadFindTranslation, loadFindSynsets }
  },
  methods: {
    clear() {
      this.wordsFilter = ''
      this.synsetsData = {}
      this.translation = {}
    },
    async searchWords() {
      if (this.wordsFilter) {
        this.loadFindTranslation(this.wordsFilter)
        this.loadFindSynsets(this.wordsFilter)
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