import { useId } from 'react'
import { cx } from '@/lib/format'

// Manual 7.2: etiqueta superior permanente, 48 px, error con texto y recuperación.
const control =
  'w-full min-h-12 rounded-sm border bg-surface px-4 text-body text-ink placeholder:text-muted ' +
  'transition-[border-color,box-shadow] duration-200 ease-out-soft outline-none ' +
  'focus:border-ink focus:shadow-[0_0_0_1px_var(--color-ink)] ' +
  'disabled:border-stone disabled:bg-stone disabled:text-muted'

export function Field({ label, hint, error, as = 'input', className, children, optional, ...props }) {
  const id = useId()
  const describedBy = `${id}-msg`
  const Control = as
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-label font-bold text-ink">
        {label}
        {optional && <span className="font-normal text-muted"> (opcional)</span>}
      </label>
      <Control
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={hint || error ? describedBy : undefined}
        className={cx(
          control,
          error ? 'border-error focus:border-error focus:shadow-[0_0_0_1px_var(--color-error)]' : 'border-divider',
          as === 'textarea' && 'min-h-32 resize-y py-3',
          as === 'select' && 'appearance-none bg-[url(/chevron.svg)] bg-[length:16px] bg-[right_16px_center] bg-no-repeat pr-11',
        )}
        {...props}
      >
        {children}
      </Control>
      {(error || hint) && (
        <p id={describedBy} className={cx('text-small', error ? 'text-error' : 'text-muted')} role={error ? 'alert' : undefined}>
          {error || hint}
        </p>
      )}
    </div>
  )
}
