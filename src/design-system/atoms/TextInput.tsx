type TextInputProps = {
  id: string
  label: string
  type: 'text' | 'email'
  value: string
  onChange: (value: string) => void
  hasError?: boolean
  autoComplete?: string
  describedBy?: string
  onBlur?: () => void
}

export function TextInput({
  id,
  label,
  type,
  value,
  onChange,
  hasError = false,
  autoComplete,
  describedBy,
  onBlur,
}: TextInputProps) {
  return (
    <input
      id={id}
      className="control"
      type={type}
      aria-label={label}
      aria-invalid={hasError}
      aria-describedby={describedBy}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      autoComplete={autoComplete}
    />
  )
}
