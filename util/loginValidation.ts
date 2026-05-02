export type FormErrors = {
  email?: string;
  password?: string;
};


export const validateLoginForm = (
  email: string,
  password: string
): FormErrors => {
  const errors: FormErrors = {};



  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address';
  }

 

  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};