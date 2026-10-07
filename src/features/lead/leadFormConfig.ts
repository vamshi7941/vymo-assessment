export type LeadFormValues = {
  fullName: string
  email: string
  leadType: string
  companyName: string
  phone: string
  notes: string
  consent: boolean
}

export type ValidationRules = {
  required?: boolean
  email?: boolean
  pattern?: {
    value: RegExp
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
}

type FieldBase = {
  name: keyof LeadFormValues
  label: string
  hint?: string
  autoComplete?: string
  validations?: ValidationRules
  visibleWhen?: {
    field: keyof LeadFormValues
    equals: string | boolean
  }
}

export type LeadFormField =
  | (FieldBase & { type: 'text' | 'email'; name: keyof LeadFormValues })
  | (FieldBase & {
      type: 'select'
      name: keyof LeadFormValues
      options: { label: string; value: string }[]
      placeholder?: string
    })
  | (FieldBase & { type: 'textarea'; name: keyof LeadFormValues })
  | (FieldBase & { type: 'checkbox'; name: keyof LeadFormValues })

export const leadFormConfig: LeadFormField[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full name',
    hint: 'Enter your first and last name.',
    autoComplete: 'name',
    validations: { required: true },
  },
  {
    name: 'email',
    type: 'email',
    label: 'Work email',
    hint: 'We’ll use this to follow up with you.',
    validations: { required: true, email: true },
  },
  {
    name: 'leadType',
    type: 'select',
    label: 'I’m interested as a',
    placeholder: 'Select one',
    options: [
      { label: 'Individual', value: 'Individual' },
      { label: 'Company', value: 'Company' },
    ],
    validations: { required: true },
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'Company name',
    hint: 'Tell us which company you’re with.',
    visibleWhen: { field: 'leadType', equals: 'Company' },
    validations: { required: true },
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone number',
    hint: 'Enter a 10-digit phone number.',
    validations: {
      required: true,
      pattern: {
        value: /^\d{10}$/,
        message: 'Enter a valid 10-digit phone number.',
      },
    },
  },
  {
    name: 'notes',
    type: 'textarea',
    label: 'How can we help?',
    hint: 'Optional · Up to 200 characters.',
    validations: {
      maxLength: {
        value: 200,
        message: 'Keep your message to 200 characters or fewer.',
      },
    },
  },
  {
    name: 'consent',
    type: 'checkbox',
    label: 'I agree to be contacted about my enquiry.',
    validations: { required: true },
  },
]
