import { describe, expect, it } from 'vitest'
import { validate } from './validation'

const ok = { name: 'Ana Pérez', email: 'ana@correo.com', phone: '998 123 4567', message: '', consent: true }

describe('validate', () => {
  it('acepta datos válidos', () => expect(validate(ok)).toEqual({}))
  it('marca correo inválido y consentimiento', () => {
    const e = validate({ ...ok, email: 'correo.incorrecto', consent: false })
    expect(Object.keys(e).sort()).toEqual(['consent', 'email'])
  })
  it('teléfono es opcional', () => expect(validate({ ...ok, phone: '' })).toEqual({}))
})
