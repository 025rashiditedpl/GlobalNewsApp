export type FormErrors = {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
};

export const validateRegisterForm = (
  username: string,
  email: string,
  phone: string,
  password: string
): FormErrors => {
  const errors: FormErrors = {};

  if (!username.trim()) {
    errors.username = 'Username is required';
  } else if (username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = 'Enter a valid 10-digit phone number';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};