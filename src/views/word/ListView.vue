<template>
  <div class="content-medium">
    <h1>Search Word</h1>
    <div class="form-row mt-2">
      <label for="searchWord" class="form-label required size-20">search word</label>
      <input type="text" name="searchWord" v-model="word" class="form-control size-50">
      <input type="button" value="search" class="btn btn-primary" @click="searchWords">
      <input type="button" value="clear" class="btn btn-secondary" @click="clear">
    </div>
    <div class="form-row mt-2">
      <label for="translation" class="form-label required size-20">translation</label>
      <input type="text" name="translation" v-model="translationField" class="form-control size-50">
      <input type="button" value="flashcard" class="btn btn-warning" @click="createFlashcard">
    </div>

    <div v-if="error" class="invalid-feedback" style="display: block;">
      {{ error }}
    </div>
    <div v-if="flashcards">
      <p>Flashcards</p>
      <ul class="text-left mt-4">
        <li v-for="flashcard in flashcards" :key="flashcard.id">
          {{ flashcard.keyword }} - {{ flashcard.translations }}
        </li>
      </ul>
    </div>
    <div class="text-center">Engish - Polish Piotrowski+Saloni/FreeDict dictionary</div>
    <div v-if="translation && translation.definition" class="text-left small">
      <div v-for="line in translation.definition.split('\n')">
        {{ line }}
      </div>
    </div>
    <p class="text-center mt-4">NLTK WordNet definitions</p>
    <ol>
      <li v-for="synset in synsets.synsets" :key="synset.name" class="word-element">
        <input type="radio" :id="synset.name" :value="synset.name" v-model="synsetRadio">
        {{ synset.name }} - {{ synset.definition }}<br>
        <span class="translation">{{ synset.pol }}</span>
      </li>
    </ol>
    <p class="text-center mt-4">Sentences</p>
    <p v-for="sentence in sentences" :key="sentence.id">
      <input type="checkbox" :value="sentence.id" v-model="sentencesChecked">
      {{ sentence.sentence }}
    </p>
  </div>
</template>

<script>
import loadAddFlashcard from '@/composable/addFlashcard'
import findFlashcards from '@/composable/findFlashcards'
import findSentences from '@/composable/findSentences'
import findTranslation from '@/composable/findTranslation'
import findSynsets from '@/composable/synsets'
import loadUpdateFlashcardSentences from '@/composable/updateFlashcardSentences'
import { useRouter } from 'vue-router'
export default {
  name: 'words',
  data() {
    return {
      error: '',
      sentencesChecked: [],
      synsetRadio: '',
      translationField: '',
      word: '',
    }
  },
  setup() {
    const { translation, error1, loadFindTranslation } = findTranslation()
    const { synsets, error2, loadFindSynsets } = findSynsets()
    const { flashcards, error3, loadFindFlashcards } = findFlashcards()
    const { sentences, error4, loadFindSentences } = findSentences()
    const { flashcard, error5, addFlashcard } = loadAddFlashcard()
    const { error6, updateFlashcardSentences } = loadUpdateFlashcardSentences()

    return { 
      flashcards,
      flashcard,
      translation,
      sentences,
      synsets,
      addFlashcard,
      loadFindTranslation,
      loadFindSynsets,
      loadFindFlashcards,
      loadFindSentences,
      updateFlashcardSentences,
    }
  },
  mounted () {
    const router = useRouter()
    const query = router.currentRoute.value.query

    this.word = query.q
    this.searchWords()
  },
  methods: {
    clear() {
      this.word = ''
      this.synsets = {}
      this.translation = {}
    },
    async searchWords() {
      if (this.word) {
        this.loadFindFlashcards(this.word)
        this.loadFindTranslation(this.word)
        this.loadFindSynsets(this.word)
        this.loadFindSentences(this.word)
      }
    },
    async createFlashcard() {
      console.log('asdfasdf asdfasdf')
      if (this.translationField !== '') {
        this.addFlashcard(this.word, [this.translationField])
      } else {
        this.error = "The translation is empty"
      }
    }
  },
  watch: {
    synsetRadio () {
      this.synsets.synsets.forEach(synset => {
        if (this.synsetRadio == synset.name) {
          this.translationField = synset.pol
        }
      })
    },
    flashcard () {
      this.flashcards.push(this.flashcard)
      if (this.sentencesChecked !== '') {
        this.updateFlashcardSentences(this.flashcard.id, this.sentencesChecked)
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

.size-50 {
  display: inline-block;
  width: 50%;
}

.size-20 {
  display: inline-block;
  width: 20%;
}
</style>