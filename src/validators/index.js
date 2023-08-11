
// Validator for checking if a field is empty
const isEmpty = (value, errorMessage = 'This field is required.') => {
  return value.trim() === '' ? errorMessage : ''
}
  
// Validator for email format
const isValidEmail = (email, errorMessage = 'Invalid email format.') => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
  return emailRegex.test(email) ? '' : errorMessage
}

// Validator for matching field values
const isMatch = (value, targetValue, errorMessage = 'Values do not match.') => {
  return value !== targetValue ? errorMessage : ''
}
  
const isNumeric = (value, errorMessage = 'Please enter a numeric value.') => {
  return isNaN(value) ? errorMessage : ''
}
  
// Export the validators as an object
const validators = {
  isEmpty,
  isValidEmail,
  isMatch,
  isNumeric,

}

export default validators
