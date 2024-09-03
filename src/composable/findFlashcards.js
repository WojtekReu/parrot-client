import { ref } from 'vue'

const loadFindFlashcards = (error) => {
  const flashcards = ref([])

  const findFlashcards = async (wordStr) => {
    await fetch(
      `${process.env.VUE_APP_API_URL}/flashcards/find/${wordStr}`,
      {
        credentials: "include",
      }
    )
      .then(response => response.json())
      .then(data => flashcards.value = data)
      .catch(err => error.value = err.message)
  }

  return { flashcards, findFlashcards }
}

export default loadFindFlashcards
