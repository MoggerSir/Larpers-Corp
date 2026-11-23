// Reglas del formulario de contacto. Devuelven mensaje (con recuperación) o ''.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+\d][\d\s-]{7,16}$/

export const contactRules = {
  name: (v) => (v.trim().length >= 3 ? '' : 'Escribe tu nombre completo.'),
  email: (v) => (EMAIL.test(v.trim()) ? '' : 'Introduce un correo válido, por ejemplo nombre@correo.com.'),
  phone: (v) => (!v.trim() || PHONE.test(v.trim()) ? '' : 'Usa solo números, espacios o guiones (10 dígitos).'),
  message: (v) => (v.trim().length <= 600 ? '' : 'El mensaje admite hasta 600 caracteres.'),
  consent: (v) => (v ? '' : 'Necesitamos tu autorización para contactarte.'),
}

export function validate(values, rules = contactRules) {
  const errors = {}
  for (const [field, rule] of Object.entries(rules)) {
    const message = rule(values[field] ?? '')
    if (message) errors[field] = message
  }
  return errors
}
