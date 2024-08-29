<template>
  <div class="content-medium">
    <div v-if="book">
      <h1>{{ book.title }} - {{ book.author }}</h1>
    </div>
    <div class="form-row">
      <label for="searchWord" class="form-label mt-4">Flashcard nr</label>
      <input type="text" class="flashcardNr form-control separate" v-model="flashcardNr" @keypress="getNextFlashcard">
      <input type="hidden" v-model="flashcardNrHidden">
      <input type="button" @click="getNextTranslation" value="Next" :disabled="nextDisabled" class="btn btn-primary">
    </div>
    <div class="score">Your results: <span class="correct">{{ correctResults }}</span> / {{ totalResults }}</div>
    <div v-if="flashcardNrHidden" class="flashcard">
      <div v-if="error"></div>
      <div v-else-if="!status">Loading...</div>
      <div v-else>
        <div v-if="sentences">
          <ol class="sentences">
            <li v-for="sentence in sentences" :key="id">
              <span v-html="boldKeyword(sentence.sentence, flashcard.keyword)"></span>
            </li>
          </ol>
        </div>
        <p>
          <span class="label">EN: </span> {{ flashcard.keyword }}
        </p>
        <div class="form-row">
          <span class="label">PL: </span>
          <input type="text" v-focus v-model="typedText" @keypress="ready" class="form-control typedText">
        </div>
        <div v-if="yourAnswer">
          <p class="correct" v-if="flashcard.translations.includes(yourAnswer)">
            <span class="label">Correct! </span> {{ yourAnswer }}
          </p>
          <div v-else>
            <div class="incorrect"><span class="label">Your:</span>{{ yourAnswer }}</div>
            <div v-for="translation in flashcard.translations"><span class="label">Should be:</span>{{
      translation }}</div>
          </div>
        </div>
        <div class="form-row">
          <input type="button" @click="editWords" class="btn btn-warning separate" value="Edit Words">
          <input type="button" @click="editTranslation" class="btn btn-warning separate" value="Edit Translation">
          <input type="button" @click="getDefinitions" class="btn btn-primary separate" value="Show definitions">
        </div>
        <div v-if="showEditTranslation">
          <form @submit="saveTranslation">
            <p class="translation-edition-label">Editing translation for: {{ flashcard.keyword }}</p>
            <div v-for="translation in flashcard.translations" :key="id" class="form-row">
              <input type="text" name="translation[]" class="form-control" :value="translation">
            </div>
            <div class="form-row">
              <input type="button" @click="addTranslation" class="btn btn-sm btn-warning separate" value="add new">
              <input type="button" @click="removeTranslation" class="btn btn-sm btn-danger separate" value="remove">
              <input type="submit" @click="saveTranslation" class="btn btn-primary separate" value="save">
            </div>
          </form>
        </div>
        <div v-if="showDefinition">
          Definitions:
          <ul>
            <li v-for="w1 in words" :key="id" class="definition-row">{{ w1.lem }} - {{ w1.synset }} - {{ w1.definition }}</li>
          </ul>
        </div>
        <div v-if="showEditWords">
          <form @submit="saveChanges">
            <div class="definition-row">
              Choose row for edition: 
              <span v-for="wf in wordsFlashcard" :key="id" class="wordFlashcard">
                <input type="radio" name="wordFlashcard" :value="wf.id" v-model="wordFlashcardInput" class=""
                  :checked="this.wordsFlashcard[0] == wf" @change="getSentencesForWord(wf.id)">{{ wf.lem }}
              </span>
            </div>
            <ol class="sentences">
              <li v-for="sentence in sentencesForWord" :key="id">
                <input type="button" @click="getWordDefinition(sentence.id)" class="btn btn-warning btn-sm me-md-2" value="Check">
                <input type="checkbox" checked="true" name="sentence[]" :value="sentence.id">
                {{ sentence.sentence }}
              </li>
            </ol>
            <div v-if="word" class="mt-4">word.lem = {{ word.lem }}</div>
            <div v-if="synsets.length" class="mt-4">
              <ol>
                <li v-for="synset in synsets">
                  <input type="radio" :checked="synset[0]" name="synset" :value="synset[1]">
                   {{ synset[1] }} - {{ synset[2] }}
                </li>
              </ol>
              <div class="gap-2 mt-4 mb-5 d-md-flex justify-content-md-end">
                <input type="submit" @click="saveChanges()" class="btn btn-primary btn-sm me-md-2" value="Save">
                <input type="button" @click="cancelChanges()" class="btn btn-secondary btn-sm " value="Cancel">
              </div>
            </div>
            <div v-else-if="errorMessage" class="invalid-feedback" style="display: block;">
              Dictionary endpoint connection problem: {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="error" class="invalid-feedback" style="display: block;">{{ error }}</div>
    <div v-if="message" class="valid-feedback" style="display: block;">{{ message }}</div>
  </div>
</template>

<script>
import getFlashcardIds from '@/composable/getFlashcardIds'

const focus = {
  mounted: (el) => el.focus()
}

export default {
  props: ['id'],
  name: 'BookView',
  setup(props) {
    const { book, flashcards, error, load } = getFlashcardIds(props.id)
    load()

    return { book, flashcards, error }
  },
  directives: {
    // enables v-focus in template
    focus
  },
  data() {
    return {
      correctResults: 0,
      errorMessage: null,
      totalResults: 0,
      status: null,
      flashcardNr: 0,
      flashcardNrHidden: '',
      flashcard: null,
      message: '',
      typedText: '',
      yourAnswer: '',
      rightAnswer: '',
      source: '',
      sentences: [],
      sentencesForWord: [],
      showDefinition: false,
      showEditWords: false,
      showEditTranslation: false,
      word: null,
      synsets: [],
      sentenceCheckbox: '',
      translationInput: '',
      words: [],
      wordsFlashcard: [],
      wordFlashcardInput: 0,
      nextDisabled: false,
    }
  },
  methods: {
    async fetchData() {
      this.yourAnswer = ''
      let flashcardId = ''
      if (this.flashcardNrHidden) {
        flashcardId = this.flashcards[this.flashcardNrHidden -1]
      }
      if (flashcardId !== '' && flashcardId !== undefined) {
        this.status = null
        this.error = null
        await fetch(
          `${process.env.VUE_APP_API_URL}/flashcards/${flashcardId}`,
          {
            credentials: "include",
          }
        )
          .then(response => response.json())
          .then(data => this.flashcard = data)
          .catch(err => this.error = err.message)
        if (this.flashcard) {
          await fetch(
            `${process.env.VUE_APP_API_URL}/books/${this.book.id}/flashcards/${flashcardId}/sentences`,
            {
              credentials: "include",
            }
          )
            .then(response => response.json())
            .then(data => this.sentences = data)
            .catch(err => this.error = err.message)
          await fetch(
            `${process.env.VUE_APP_API_URL}/flashcards/${this.flashcard.id}/words`,
            {
              credentials: "include",
            }
          )
            .then(response => response.json())
            .then(data => this.wordsFlashcard = data)
            .catch(err => this.error = err.message)
        }
        this.status = 'ready'
        this.message = ''
      } else {
        if (flashcardId === undefined) {
          this.error = " "
          this.message = "You completed your flashcards"
        } else {
          this.message = "Click next to show flashcard"
        }
      }
    },
    ready(keyboardEvent) {
      if (keyboardEvent.key === 'Enter') {
        this.source = this.flashcard.keyword
        this.rightAnswer = this.flashcard.translations
        this.yourAnswer = this.typedText
        if (this.yourAnswer === '') {
          this.getNextTranslation()
        } else {
          if (this.rightAnswer.includes(this.yourAnswer)) {
            this.correctResults++
          }
          this.totalResults++
          this.yourAnswer = this.typedText
        }
        this.typedText = ''
      } else if (this.yourAnswer) {
        this.yourAnswer = ''
      }
    },
    getNextFlashcard(keyboardEvent) {
      if (keyboardEvent.key === 'Enter') {
        this.flashcardNrHidden = this.flashcardNr
      }
    },
    getNextTranslation() {
      this.flashcardNr++
      this.flashcardNrHidden = this.flashcardNr
      this.showEditWords = false
      this.showEditTranslation = false
      this.word = null
      this.synsets = []
      this.words = []
      this.wordFlashcardInput = 0
      if (this.flashcardNrHidden - 1 === this.flashcards.length) {
        this.nextDisabled = true
      }
    },
    async editWords() {
      this.showEditWords = true
      this.showEditTranslation = false
      this.showDefinition = false
      if (this.wordsFlashcard.length > 0) {
        let wordId = this.wordsFlashcard[0].id
        if (this.wordFlashcardInput) {
          wordId = this.wordFlashcardInput
        }
        await this.getSentencesForWord(wordId)
      }
    },
    editTranslation() {
      this.showEditTranslation = true
      this.showEditWords = false
      this.showDefinition = false
    },
    async getSentencesForWord(wordId) {
      await fetch(
        `${process.env.VUE_APP_API_URL}/words/${wordId}/sentences`,
          {
            credentials: "include",
          }
      )
        .then(response => response.json())
        .then(data => this.sentencesForWord = data)
        .catch(err => this.error = err.message)
    },
    async getDefinitions() {
      this.showEditTranslation = false
      this.showEditWords = false
      this.showDefinition = true
      await fetch(
        `${process.env.VUE_APP_API_URL}/flashcards/${this.flashcard.id}/words`,
          {
            credentials: "include",
          }
      )
        .then(response => response.json())
        .then(data => this.words = data)
        .catch(err => this.error = err.message)
    },
    async getWordDefinition(sentence_id) {
        let wordId = this.wordsFlashcard[0].id
        if (this.wordFlashcardInput) {
          wordId = this.wordFlashcardInput
        }
        await fetch(`${process.env.VUE_APP_API_URL}/words/${wordId}/sentences/${sentence_id}/synset`)
          .then(response => response.json())
          .then(data => {
            if (data.errorMessage !== "") {
              this.errorMessage = data.errorMessage
            } else {
              this.word = data.word,
              this.synsets = data.synsets
            }
          })
          .catch(err => this.error = err.message)
    },
    async saveChanges(submitEvent) {
      if (submitEvent) {
        submitEvent.preventDefault()
        let sentence_ids = []
        let disconnect_ids = []
        let sentencesList = submitEvent.target.elements["sentence[]"]
        if (sentencesList.value) {
          if (sentencesList.type === "checkbox" && sentencesList.checked === true) {
            sentence_ids.push(sentencesList.value)
          } else {
            disconnect_ids.push(sentence_ids.value)
          }
        } else {
          submitEvent.target.elements["sentence[]"].forEach((el) => {
            if (el.type === "checkbox" && el.checked === true) {
              sentence_ids.push(el.value)
            } else {
              disconnect_ids.push(el.value)
            }
          })
        }
        this.word.synset = submitEvent.target.elements.synset.value
        this.synsets.forEach((el) => {
          if (el[1] === this.word.synset) {
            this.word.definition = el[2]
          }
        })
        let data = this.word
        let wordId = this.word.id
        delete data.id
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
        await fetch(`${process.env.VUE_APP_API_URL}/words/${wordId}/update`, requestOptions)
          .catch(err => this.error = err.message)
        let data2 = {
          "word_id": wordId,
          "disconnect_ids": disconnect_ids,
          "sentence_ids": sentence_ids,
        }
        const requestOptions2 = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data2),
          credentials: "include",
        }
        await fetch(`${process.env.VUE_APP_API_URL}/words/${wordId}/sentences`, requestOptions2)
          .catch(err => this.error = err.message)
        let data3 = {
          "flashcard_id": this.flashcards.id,
          "disconnect_ids": disconnect_ids,
          "sentence_ids": sentence_ids,
        }
        const requestOptions3 = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data3),
          credentials: "include",
        }
        await fetch(`${process.env.VUE_APP_API_URL}/words/${wordId}/sentences`, requestOptions3)
          .catch(err => this.error = err.message)
      }
    },
    cancelChanges() {
      this.showEditWords = false
      this.showEditTranslation = false
      this.word = null
      this.synsets = []
    },
    addTranslation() {
      this.flashcard.translations.push('')
    },
    removeTranslation() {
      this.flashcard.translations.pop()
    },
    async saveTranslation(submitEvent) {
      submitEvent.preventDefault()
      let translationList = submitEvent.target.form.elements["translation[]"]
      if (translationList.value) {
        this.flashcard.translations = [translationList.value]
      } else {
        this.flashcard.translations = []
        translationList.forEach((el) => {
          this.flashcard.translations.push(el.value)
        })
      }
      const requestOptions4 = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.flashcard),
        credentials: "include",
      }
      await fetch(`${process.env.VUE_APP_API_URL}/flashcards/${this.flashcard.id}/update`, requestOptions4)
        .catch(err => this.error = err.message)
      this.showEditTranslation = false
    },
    writeTranslation(translation) {
      let last = this.flashcard.translations.length - 1
      this.flashcard.translations[last] = translation
    },
    boldKeyword(sentence, keyword) {
      const position = sentence.indexOf(keyword)
      return sentence.substring(0, position) + "<b>" + keyword + "</b>" + sentence.substring(position + keyword.length)
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    flashcardNrHidden() {
      this.fetchData()
    }
  }
}
</script>

<style>
.correct {
  color: green;
}

.definition-row {
  margin: 10px 0;
}

.incorrect {
  color: crimson;
}

.flashcardNr {
  width: 65px;
  text-align: center;
  display: inline-block;
}

.flashcard {
  max-width: 650px;
  text-align: left;
  margin: 0 auto;
}

.form-row {
  margin: 15px 0;
}

.label {
  display: inline-block;
  width: 70px;
  font-size: small;
  text-align: right;
  margin-right: 10px;
}

ol.sentences {
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
}

.separate {
  margin: 0 20px;
}
.score {
  margin: 20px
}

.typedText {
  display: inline-block;
  width: 300px;
  max-width: 70%;
}

.translation-edition-label {
  margin: 20px;
}

.wordFlashcard {
  margin-left: 5px;
}

.wordFlashcard input {
  margin: 0 5px 0 25px;
}
</style>