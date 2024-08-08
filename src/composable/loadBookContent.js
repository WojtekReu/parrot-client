import { ref } from 'vue'

const loadBookContent = () => {
  const message2 = ref({})
  let status = null

  const uploadBook = async (bookId, bookContent) => {
    const formData = new FormData()
    formData.append("name", bookContent["name"])
    formData.append("file", bookContent)
    message2.value = {
      text: "Loading book content...  It may take quite a long time.",
      type: "loading",
    }
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
          message2.value.text = "Loading completed."
          message2.value.type = "success"
        } else {
          message2.value.text = data.detail
          message2.value.type = "error"
        }
      })
      .catch(err => {
        message2.value.text = err.message
        message2.value.type = "error"
      })
  }

  return { message2, uploadBook }
}

export default loadBookContent
