import { useState } from 'react'
import { contactRules, validate } from '@/lib/validation'
import { sendVisitRequest } from '@/services/contact.service'

const EMPTY = { name: '', email: '', phone: '', property: '', date: '', message: '', consent: false }

// Manual 7.2: validar al salir del campo o al enviar, nunca por tecla. Conservar valores.
export function useContactForm(initial = {}) {
  const [values, setValues] = useState({ ...EMPTY, ...initial })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const checkField = (name, value) => {
    const rule = contactRules[name]
    if (!rule) return
    setErrors((e) => ({ ...e, [name]: rule(value) || undefined }))
  }

  const bind = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setValues((v) => ({ ...v, [name]: value }))
      // Una vez marcado el error, se limpia en cuanto el valor es válido.
      if (errors[name]) checkField(name, value)
    },
    onBlur: (e) => checkField(name, e.target.type === 'checkbox' ? e.target.checked : e.target.value),
  })

  const submit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      e.currentTarget.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    setStatus('sending')
    try {
      await sendVisitRequest(values)
      setStatus('sent')
      setValues({ ...EMPTY })
    } catch {
      setStatus('error')
    }
  }

  return { values, bind, submit, status, setStatus }
}
