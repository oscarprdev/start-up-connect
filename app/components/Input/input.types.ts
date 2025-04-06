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

export const InputType = {
  TEXT: 'text',
  PASSWORD: 'password',
  FILE: 'file',
  EMAIL: 'email',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
  SEARCH: 'search',
  DATE: 'date',
  TIME: 'time',
  DATETIME_LOCAL: 'datetime-local',
  MONTH: 'month',
  WEEK: 'week',
  COLOR: 'color',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  RANGE: 'range',
  HIDDEN: 'hidden',
  IMAGE: 'image',
  RESET: 'reset',
  SUBMIT: 'submit',
} as const;

export type InputType = (typeof InputType)[keyof typeof InputType];
