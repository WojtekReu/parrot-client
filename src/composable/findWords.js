import { ref } from 'vue'

const findWords = (wordStr) => {
  const words = ref([])
  const error = ref(null)

  const loadFindWords = async () => {
    await fetch(`${process.env.VUE_APP_API_URL}/words/find/${wordStr}`)
    .then(response => response.json())
    .then(data => words.value = data)
    .catch(err => error.value = err)
  }

  return { words, error, loadFindWords }
}

export default findWords
