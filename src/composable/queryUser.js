import { APISettings, store } from '@/store'
import { ref } from 'vue'

const queryUser = () => {
  const error = ref(null)

  const getUser = async () => {
    await fetch(
      `${APISettings.APIUrl}/users/whoami`,
      {
        credentials: "include",
      }
    )
    .then(response => {
      let data = response.json()
      if (response.status == 401) {
        window.location = "/logout"
      }
      return data
    })
    .then(data => {
      if (data.detail !== undefined && data.detail !== "") {
        error.value = data.detail
      } else {
        store.currentUser = data
      }
    })
    .catch(err => error.value = err.message)
  }

  const updateUser = async (userId, data) => {
    await fetch(
    `${APISettings.APIUrl}/users/${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }
    ) 
    .then(response => response.json())
    .then(data => store.currentUser = data)
    .catch(err => error.value = err.message)
  }

  return { error, getUser, updateUser }
}

export default queryUser
