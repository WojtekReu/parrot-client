import { ref } from 'vue'

const addBook = (form) => {
  const book = ref({})
  const message = ref({})
  let status = null

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
        status = response.status
        return response.json()
      })
      .then(data => {
        if (status === 201) {
          message.value.text = "Added new book."
          message.value.type = "success"
          book.value = data
        } else {
          message.value.text = data.detail
          message.value.type = "error"
        }
      })
      .catch(err => {
        message.value.text = err.message
        message.value.type = "error"
      })
  }

  return { book, message, load }
}

export default addBook
