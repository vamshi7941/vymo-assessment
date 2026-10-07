type TextAreaProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  maxLength?: number
  hasError?: boolean
  describedBy?: string
  onBlur?: () => void
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  maxLength,
  hasError = false,
  describedBy,
  onBlur,
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      className="control textarea-control"
      aria-label={label}
      aria-invalid={hasError}
      aria-describedby={describedBy}
      value={value}
      maxLength={maxLength}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      rows={4}
    />
  )
}
