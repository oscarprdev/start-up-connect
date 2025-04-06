export const ButtonVariant = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  OUTLINE: 'outline',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  LINK: 'link',
} as const;

export type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  DEFAULT: 'default',
  SMALL: 'small',
  LARGE: 'large',
  ICON: 'icon',
} as const;

export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];
