function timestampToDate(timestamp: number) {
  const date = new Date(timestamp * 1000)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const dateString = `${day}/${month}/${year} às ${hours}:${minutes}`

  return dateString
}

export { timestampToDate }
