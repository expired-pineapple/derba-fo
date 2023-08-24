export const requiredRule = [value => !!value || 'This field is required']

export const emailRules = [
  ...requiredRule,
  value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
]

export const hasExpiredRule = [date => !date || (new Date() > date) || 'File has expired']
