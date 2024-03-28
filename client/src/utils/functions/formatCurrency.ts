function formatCurrency(value: number) {
  const formattedCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)

  return formattedCurrency
}

const formatStringToCurrency = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, ''))
  const formattedNumber = numericValue / 100

  if (isNaN(formattedNumber)) {
    return formatCurrency(0)
  }

  return formatCurrency(formattedNumber)
}

const formatCurrencyToEdit = (value: number) => {
  const stringValue = value.toString()
  const formattedValue = stringValue.replace(/[^\d,.-]/g, '').replace('.', ',')

  return formattedValue
}

const formatToCurrency = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, ''))
  const formattedNumber = numericValue / 100

  if (isNaN(formattedNumber)) {
    const formattedCurrency = formatCurrency(0)
    return formattedCurrency.replace('R$', '').trim()
  }

  const formattedCurrency = formatCurrency(formattedNumber)
  return formattedCurrency.replace('R$', '').trim()
}

const formatByCurrency = (value: string) => {
  const numericValue = parseFloat(
    value.replace(/[^\d,.-]/g, '').replace(',', '.')
  )

  return numericValue
}

export {
  formatCurrency,
  formatToCurrency,
  formatStringToCurrency,
  formatByCurrency,
  formatCurrencyToEdit
}
