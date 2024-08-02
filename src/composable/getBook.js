import { ref } from 'vue'

const getBook = (bookId) => {
  const book = ref({})
  const error = ref(null)

  const load = async () => {
    await fetch(
      `${process.env.VUE_APP_API_URL}/book/${bookId}`,
      {
        credentials: "include",
      }
    )
      .then(response => response.json())
      .then(data => book.value = data)
      .catch(err => error.value = err.message)
  }

  return { book, error, load }
}

export default getBook
