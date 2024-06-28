const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
const loginRegex = /^(?!\d+$)[a-zA-Z0-9-_]{3,20}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
const phoneRegex = /^\+?\d{10,15}$/;

export function validateField(name: string, value: string): string {
  switch (name) {
    case 'first_name':
      if (!value) {
        return 'First name is required';
      } else if (!nameRegex.test(value)) {
        return 'First name must start with an uppercase letter and contain only letters and dashes';
      }
      break;
    case 'second_name':
      if (!value) {
        return 'Second name is required';
      } else if (!nameRegex.test(value)) {
        return 'Second name must start with an uppercase letter and contain only letters and dashes';
      }
      break;
    case 'login':
      if (!value) {
        return 'Login is required';
      } else if (!loginRegex.test(value)) {
        return 'Login must be 3-20 characters long, contain only letters, digits, dashes, and underscores, and not consist entirely of digits';
      }
      break;
    case 'email':
      if (!value) {
        return 'Email is required';
      } else if (!emailRegex.test(value)) {
        return 'Email is invalid';
      }
      break;
    case 'password':
      if (!value) {
        return 'Password is required';
      } else if (!passwordRegex.test(value)) {
        return 'Password must be 8-40 characters long and include at least one uppercase letter and one digit';
      }
      break;
    case 'phone':
      if (!value) {
        return 'Phone is required';
      } else if (!phoneRegex.test(value)) {
        return 'Phone must be 10-15 digits long and may start with a plus sign';
      }
      break;
    default:
      return 'Field is not defined check your input name property';
  }

  return '';
}

type AllFields = Record<string, string>;

export function validateAllFields(fields: AllFields) {
  const errors: Record<string, string> = {};

  for (const [name, value] of Object.entries(fields)) {
    errors[name] = validateField(name, value);
  }
  return errors;
}
