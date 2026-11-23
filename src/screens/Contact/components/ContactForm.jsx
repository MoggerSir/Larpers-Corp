import { AnimatePresence } from 'motion/react'
import { LoaderCircle } from 'lucide-react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { properties } from '@/data/properties'
import { cx } from '@/lib/format'
import { useContactForm } from '../useContactForm'

const today = new Date().toISOString().slice(0, 10)

export function ContactForm({ initialProperty = '' }) {
  const { bind, submit, status, setStatus } = useContactForm({ property: initialProperty })
  const consent = bind('consent')

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6 rounded-md border border-divider bg-surface p-6 shadow-1 lg:p-10">
      <AnimatePresence>
        {status === 'sent' && (
          <Alert tone="success" onClose={() => setStatus('idle')}>
            Tu solicitud fue enviada. Te contactaremos en un día hábil.
          </Alert>
        )}
        {status === 'error' && (
          <Alert tone="error" onClose={() => setStatus('idle')}>
            No pudimos enviarla. Verifica los datos e inténtalo otra vez.
          </Alert>
        )}
      </AnimatePresence>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nombre completo" autoComplete="name" placeholder="Ana Pérez" {...bind('name')} />
        <Field label="Correo electrónico" type="email" autoComplete="email" placeholder="nombre@correo.com" hint="Usaremos este dato para contactarte." {...bind('email')} />
        <Field label="Teléfono" type="tel" autoComplete="tel" placeholder="998 123 4567" optional {...bind('phone')} />
        <Field label="Fecha preferida" type="date" min={today} optional {...bind('date')} />
      </div>

      <Field as="select" label="Residencia de interés" optional {...bind('property')}>
        <option value="">Aún no lo decido</option>
        {properties.map((p) => (
          <option key={p.id} value={p.id}>{p.name} · {p.operation === 'renta' ? 'Renta' : 'Venta'}</option>
        ))}
      </Field>

      <Field as="textarea" label="Mensaje" optional placeholder="Horario para llamarte, dudas sobre financiamiento…" {...bind('message')} />

      <div className="flex flex-col gap-2">
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-body">
          <input
            type="checkbox"
            name={consent.name}
            checked={consent.value}
            onChange={consent.onChange}
            onBlur={consent.onBlur}
            aria-invalid={Boolean(consent.error) || undefined}
            aria-describedby={consent.error ? 'consent-msg' : undefined}
            className={cx('mt-1 size-5 shrink-0 accent-ink', consent.error && 'outline-1 outline-error')}
          />
          Autorizo a Larper Corp a contactarme sobre esta solicitud.
        </label>
        {consent.error && <p id="consent-msg" role="alert" className="text-small text-error">{consent.error}</p>}
      </div>

      <Button type="submit" disabled={status === 'sending'} className="self-start">
        {status === 'sending' ? (
          <>
            <LoaderCircle size={20} strokeWidth={1.75} aria-hidden className="animate-spin" /> Enviando
          </>
        ) : (
          'Solicitar visita'
        )}
      </Button>
    </form>
  )
}
