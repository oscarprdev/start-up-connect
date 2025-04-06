export const InputVariant = {
  DEFAULT: 'default',
  GHOST: 'ghost',
  DESTRUCTIVE: 'destructive',
} as const;

export type InputVariantType = (typeof InputVariant)[keyof typeof InputVariant];

export const InputSize = {
  DEFAULT: 'default',
  SM: 'sm',
  LG: 'lg',
} as const;

export type InputSizeType = (typeof InputSize)[keyof typeof InputSize];
