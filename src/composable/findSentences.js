import { ref } from 'vue'

const findSentences = () => {
  const sentences = ref([])
  const error = ref(null)

  const loadFindSentences = async (wordStr) => {
    await fetch(
      `${process.env.VUE_APP_API_URL}/sentences/search?q=${wordStr}`,
      {
        credentials: "include",
      }
    )
    .then(response => response.json())
    .then(data => sentences.value = data)
    .catch(err => error.value = err)
  }

  return { sentences, error, loadFindSentences }
}

export default findSentences
