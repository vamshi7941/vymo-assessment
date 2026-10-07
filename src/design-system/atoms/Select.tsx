type SelectProps = {
  id: string
  label: string
  value: string
  options: { label: string; value: string }[]
  placeholder?: string
  onChange: (value: string) => void
  hasError?: boolean
  describedBy?: string
  onBlur?: () => void
}

export function Select({
  id,
  label,
  value,
  options,
  placeholder,
  onChange,
  hasError = false,
  describedBy,
  onBlur,
}: SelectProps) {
  return (
    <select
      id={id}
      className="control"
      aria-label={label}
      aria-invalid={hasError}
      aria-describedby={describedBy}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
    >
      <option value="" disabled>
        {placeholder ?? 'Choose an option'}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
