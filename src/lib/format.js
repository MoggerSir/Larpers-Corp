const mxn = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export const formatPrice = (amount, operation = 'venta') =>
  `${mxn.format(amount)} MXN${operation === 'renta' ? ' / mes' : ''}`

export const formatArea = (m2) => `${new Intl.NumberFormat('es-MX').format(m2)} m²`

export const cx = (...classes) => classes.filter(Boolean).join(' ')
