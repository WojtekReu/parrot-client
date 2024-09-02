import { ref } from 'vue'

const loadFindSentences = (error) => {
  const sentences = ref([])

  const findSentences = async (wordStr) => {
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

  return { sentences, findSentences }
}

export default loadFindSentences
