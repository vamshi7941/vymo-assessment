import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children?: ReactNode
}

export function Button({ label, children, ...props }: ButtonProps) {
  return (
    <button className="button" {...props}>
      {children ?? label}
    </button>
  )
}
