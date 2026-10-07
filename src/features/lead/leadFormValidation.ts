import type {
  LeadFormField,
  LeadFormValues,
} from './leadFormConfig'

export type LeadFormErrors = Partial<
  Record<keyof LeadFormValues, string>
>

export function isFieldVisible(
  field: LeadFormField,
  values: LeadFormValues,
): boolean {
  if (!field.visibleWhen) return true
  return values[field.visibleWhen.field] === field.visibleWhen.equals
}

export function validateForm(
  config: LeadFormField[],
  values: LeadFormValues,
): LeadFormErrors {
  const errors: LeadFormErrors = {}

  for (const field of config) {
    if (!isFieldVisible(field, values)) continue

    const value = values[field.name]
    const rules = field.validations
    if (!rules) continue

    const isEmpty =
      typeof value === 'boolean' ? !value : value.trim().length === 0

    if (rules.required && isEmpty) {
      errors[field.name] =
        field.type === 'checkbox'
          ? 'Please provide your consent.'
          : 'This field is required.'
      continue
    }

    if (typeof value !== 'string' || value.length === 0) continue

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = 'Enter a valid email address.'
      continue
    }
    if (rules.pattern && !rules.pattern.value.test(value)) {
      errors[field.name] = rules.pattern.message
      continue
    }
    if (rules.maxLength && value.length > rules.maxLength.value) {
      errors[field.name] = rules.maxLength.message
    }
  }

  return errors
}
