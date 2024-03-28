const formatUsername = (name: string): string => {
  const nameParts = name.split(' ')

  if (nameParts.length < 2) {
    return nameParts[0].charAt(0).toUpperCase()
  } else {
    const firstName = nameParts[0].charAt(0)
    const lastName = nameParts[nameParts.length - 1].charAt(0)

    return `${firstName.toUpperCase()}${lastName.toUpperCase()}`
  }
}

export { formatUsername }
