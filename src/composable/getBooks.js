import { ref } from 'vue'

const getBooks = (isPrivate) => {
  const books = ref([])
  const error = ref(null)

  const load = async () => {
    let bookPath = isPrivate == true ? "users/books" : "books"
    await fetch(
      `${process.env.VUE_APP_API_URL}/${bookPath}`,
      {
        credentials: "include",
      }
    )
      .then(response => response.json())
      .then(data => books.value = data)
      .catch(err => error.value = err.message)
  }

  return { books, error, load }
}

export default getBooks
