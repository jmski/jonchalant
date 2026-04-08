import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBase {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsButton = ButtonBase &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBase> & {
    as?: 'button'
    href?: never
  }

type ButtonAsAnchor = ButtonBase &
  Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonBase> & {
    as: 'a'
    href: string
  }

type ButtonAsLink = ButtonBase &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBase> & {
    as: 'link'
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    as = 'button',
    ...rest
  } = props

  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (as === 'link') {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof ButtonBase | 'as'>
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  if (as === 'a') {
    const { href, ...anchorRest } = rest as Omit<ButtonAsAnchor, keyof ButtonBase | 'as'>
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof ButtonBase | 'as'>
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
