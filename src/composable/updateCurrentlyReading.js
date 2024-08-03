const updateCurrentlyReading = () => {

  const update = async (bookId, value) => {
    const data = {}
    data[bookId] = value
    await fetch(
      `${process.env.VUE_APP_API_URL}/books/reading`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
      }
    )
      .catch(err => console.log(err.message))
  }

  return { update }
}

export default updateCurrentlyReading
