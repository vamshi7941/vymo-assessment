import { useState, type FormEvent } from 'react'
import {
  leadFormConfig,
  type LeadFormField,
  type LeadFormValues,
} from './leadFormConfig'
import {
  isFieldVisible,
  validateForm,
  type LeadFormErrors,
} from './leadFormValidation'
import { Button } from '../../design-system/atoms/Button'
import { Checkbox } from '../../design-system/atoms/Checkbox'
import { Select } from '../../design-system/atoms/Select'
import { TextArea } from '../../design-system/atoms/TextArea'
import { TextInput } from '../../design-system/atoms/TextInput'
import { Field } from '../../design-system/Field'

const initialValues: LeadFormValues = {
  fullName: '',
  email: '',
  leadType: '',
  companyName: '',
  phone: '',
  notes: '',
  consent: false,
}

function renderControl(
  field: LeadFormField,
  values: LeadFormValues,
  updateValue: (name: keyof LeadFormValues, value: string | boolean) => void,
  validateOnBlur: (name: keyof LeadFormValues) => void,
  hasError: boolean,
  describedBy: string,
) {
  const value = values[field.name]
  const onChange = (nextValue: string | boolean) =>
    updateValue(field.name, nextValue)
  const id = `lead-${field.name}`

  switch (field.type) {
    case 'text':
    case 'email':
      return (
        <TextInput
          id={id}
          label={field.label}
          type={field.type}
          value={typeof value === 'string' ? value : ''}
          onChange={onChange}
          onBlur={() => validateOnBlur(field.name)}
          hasError={hasError}
          describedBy={describedBy}
          autoComplete={field.autoComplete}
        />
      )
    case 'select':
      return (
        <Select
          id={id}
          label={field.label}
          value={typeof value === 'string' ? value : ''}
          options={field.options}
          placeholder={field.placeholder}
          onChange={onChange}
          onBlur={() => validateOnBlur(field.name)}
          hasError={hasError}
          describedBy={describedBy}
        />
      )
    case 'textarea':
      return (
        <TextArea
          id={id}
          label={field.label}
          value={typeof value === 'string' ? value : ''}
          onChange={onChange}
          onBlur={() => validateOnBlur(field.name)}
          maxLength={field.validations?.maxLength?.value}
          hasError={hasError}
          describedBy={describedBy}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          id={id}
          label={field.label}
          value={value === true}
          onChange={onChange}
          onBlur={() => validateOnBlur(field.name)}
          hasError={hasError}
          describedBy={describedBy}
        />
      )
  }
}

export function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>(initialValues)
  const [errors, setErrors] = useState<LeadFormErrors>({})
  const [touched, setTouched] = useState<
    Partial<Record<keyof LeadFormValues, boolean>>
  >({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [submittedValues, setSubmittedValues] =
    useState<Partial<LeadFormValues> | null>(null)

  function updateValue(name: keyof LeadFormValues, value: string | boolean) {
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    const nextValidation = validateForm(leadFormConfig, nextValues)
    setErrors((current) => {
      const next = { ...current }
      for (const field of leadFormConfig) {
        if (
          hasSubmitted ||
          touched[field.name] ||
          field.name === name ||
          !isFieldVisible(field, nextValues)
        ) {
          delete next[field.name]
          if (nextValidation[field.name]) {
            next[field.name] = nextValidation[field.name]
          }
        }
      }
      return next
    })
    setSubmittedValues(null)
  }

  function validateOnBlur(name: keyof LeadFormValues) {
    setTouched((current) => ({ ...current, [name]: true }))
    const validation = validateForm(leadFormConfig, values)
    setErrors((current) => {
      const next = { ...current }
      delete next[name]
      if (validation[name]) next[name] = validation[name]
      return next
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateForm(leadFormConfig, values)
    setHasSubmitted(true)
    setTouched((current) => ({
      ...current,
      ...Object.fromEntries(
        leadFormConfig
          .filter((field) => isFieldVisible(field, values))
          .map((field) => [field.name, true]),
      ),
    }))
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmittedValues(null)
      document
        .getElementById(`lead-${Object.keys(nextErrors)[0]}`)
        ?.focus()
      return
    }

    const result: Partial<LeadFormValues> = { ...values }
    if (values.leadType !== 'Company') delete result.companyName
    setSubmittedValues(result)
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      {leadFormConfig.map((field) => {
        if (!isFieldVisible(field, values)) return null
        const id = `lead-${field.name}`
        const error = errors[field.name]
        const describedBy = [
          field.hint ? `${id}-hint` : undefined,
          error ? `${id}-error` : undefined,
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <Field
            key={field.name}
            id={id}
            label={field.label}
            hint={field.hint}
            error={error}
            checkbox={field.type === 'checkbox'}
            name={field.name}
            required={Boolean(field.validations?.required)}
          >
            {renderControl(
              field,
              values,
              updateValue,
              validateOnBlur,
              Boolean(error),
              describedBy,
            )}
          </Field>
        )
      })}

      <div className="form-footer">
        <p className="required-note">
          <span aria-hidden="true">*</span> Required fields
        </p>
        <Button label="Send enquiry" type="submit">
          Send enquiry <span aria-hidden="true">→</span>
        </Button>
      </div>

      {submittedValues && (
        <section className="submission" aria-live="polite">
          <div className="submission-icon" aria-hidden="true">✓</div>
          <div>
            <h2>Thanks, {submittedValues.fullName}.</h2>
            <p>Your enquiry is ready. Here’s a copy of the details you sent:</p>
            <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
          </div>
        </section>
      )}
    </form>
  )
}
