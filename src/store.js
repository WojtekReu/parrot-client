import { reactive } from 'vue'

export const store = reactive({
  currentUser: null,
})

export const APISettings = reactive({
  APIUrl: process.env.VUE_APP_API_URL || "http://localhost:8000/api/v2"
})