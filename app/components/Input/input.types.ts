export const InputVariant = {
  DEFAULT: 'default',
  GHOST: 'ghost',
  DESTRUCTIVE: 'destructive',
} as const;

export type InputVariant = (typeof InputVariant)[keyof typeof InputVariant];

export const InputSize = {
  DEFAULT: 'default',
  SM: 'sm',
  LG: 'lg',
} as const;

export type InputSize = (typeof InputSize)[keyof typeof InputSize];
