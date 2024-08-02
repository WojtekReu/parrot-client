import { ref } from 'vue'

const addBook = (form) => {
  const message = ref("")
  const error = ref(null)

  const load = async () => {
    await fetch(
      `${process.env.VUE_APP_API_URL}/books/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title: form.title, author: form.author}),
        credentials: "include",
      }
    )
      .then(response => {
        if (response.status == 201) {
          message.value = 'Added new book'
        }
        return response.json()
      })
      .then(data => {
        error.value = data.detail
      })
      .catch(err => error.value = err.message)
  }

  return { message, error, load }
}

export default addBook
