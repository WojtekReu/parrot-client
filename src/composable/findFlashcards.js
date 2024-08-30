import { ref } from 'vue'

const findFlashcards = () => {
  const flashcards = ref(null)
  const error = ref(null)

  const loadFindFlashcards = async (wordStr) => {
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

  return { flashcards, error, loadFindFlashcards }
}

export default findFlashcards
