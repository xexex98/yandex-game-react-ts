interface FieldValidation {
  regex: RegExp;
  empty: string;
  invalid: string;
}

const FEEDBACK: Record<string, FieldValidation> = {
  first_name: {
    regex: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    empty: 'First name is required',
    invalid:
      'First name must start with an uppercase letter and contain only letters and dashes',
  },
  second_name: {
    regex: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    empty: 'Second name is required',
    invalid:
      'Second name must start with an uppercase letter and contain only letters and dashes',
  },
  login: {
    regex: /^(?!\d+$)[a-zA-Z0-9-_]{3,20}$/,
    empty: 'Login is required',
    invalid:
      'Login must be 3-20 characters long, contain only letters, digits, dashes, and underscores, and not consist entirely of digits',
  },
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    empty: 'Email is required',
    invalid: 'Email is invalid',
  },
  password: {
    regex: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    empty: 'Password is required',
    invalid:
      'Password must be 8-40 characters long and include at least one uppercase letter and one digit',
  },
  phone: {
    regex: /^\+?\d{10,15}$/,
    empty: 'Phone is required',
    invalid: 'Phone must be 10-15 digits long and may start with a plus sign',
  },
};

export function validateField(
  name: keyof typeof FEEDBACK,
  value: string
): string {
  if (!FEEDBACK[name]) {
    return '';
  }

  if (!value) {
    return FEEDBACK[name].empty;
  } else if (!FEEDBACK[name].regex.test(value)) {
    return FEEDBACK[name].invalid;
  }

  return '';
}

type Fields = Record<string, string> | object;

export function validateAllFields(fields: Fields): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const [name, value] of Object.entries(fields)) {
    errors[name] = validateField(name, value);
  }
  return errors;
}
