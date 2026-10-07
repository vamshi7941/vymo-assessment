type CheckboxProps = {
  id: string
  label: string
  value: boolean
  onChange: (value: boolean) => void
  hasError?: boolean
  describedBy?: string
  onBlur?: () => void
}

export function Checkbox({
  id,
  label,
  value,
  onChange,
  hasError = false,
  describedBy,
  onBlur,
}: CheckboxProps) {
  return (
    <input
      id={id}
      className="checkbox-control"
      type="checkbox"
      aria-label={label}
      aria-invalid={hasError}
      aria-describedby={describedBy}
      checked={value}
      onChange={(event) => onChange(event.target.checked)}
      onBlur={onBlur}
    />
  )
}
