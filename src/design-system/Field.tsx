import type { ReactNode } from 'react'

type FieldProps = {
  id: string
  label: string
  hint?: string
  error?: string
  checkbox?: boolean
  required?: boolean
  name: string
  children: ReactNode
}

export function Field({
  id,
  label,
  hint,
  error,
  checkbox = false,
  required = false,
  name,
  children,
}: FieldProps) {
  return (
    <div className={`field field-${name}${checkbox ? ' field-checkbox' : ''}`}>
      {checkbox ? (
        <div className="checkbox-row">
          {children}
          <label className="checkbox-label" htmlFor={id}>
            {label}
            {required && <span className="required-star" aria-hidden="true"> *</span>}
          </label>
        </div>
      ) : (
        <>
          <label className="field-label" htmlFor={id}>
            {label}
            {required && <span className="required-star" aria-hidden="true"> *</span>}
          </label>
          {children}
        </>
      )}
      {hint && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
