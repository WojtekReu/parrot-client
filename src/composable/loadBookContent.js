import { ref } from 'vue'

const uploadBook = (bookId, bookContent) => {
  const message = ref({})
  let status = null

  const load = async () => {
    const formData = new FormData()
    formData.append("name", bookContent["name"])
    formData.append("file", bookContent)

    await fetch(
      `${process.env.VUE_APP_API_URL}/books/upload/${bookId}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    )
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(data => {
        if (status === 200) {
          message.value.text = "Loaded book content."
          message.value.type = "success"
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

  return { message, load }
}

export default uploadBook
