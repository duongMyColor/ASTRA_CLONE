import { userContentLength } from '@repo/consts/user';

import validateForm from './validateField';
import { ValidationRule } from '@repo/utils/formValidator';

const editionRules: ValidationRule[] = [
  {
    field: 'role',
    required: true,
  },
  {
    field: 'username',
    required: true,
    minLength: userContentLength.username.min,
    maxLength: userContentLength.username.max,
  },
  {
    field: 'email',
    required: true,
    minLength: userContentLength.email.min,
    maxLength: userContentLength.email.max,
  },
  {
    field: 'newPassword',
    required: false,
    minLength: userContentLength.password.min,
    maxLength: userContentLength.password.max,
  },
  {
    field: 'confirmNewPassword',
    required: false,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'username',
    required: true,
    minLength: userContentLength.username.min,
    maxLength: userContentLength.username.max,
  },
  {
    field: 'role',
    required: true,
  },
  {
    field: 'email',
    required: true,
    minLength: userContentLength.email.min,
    maxLength: userContentLength.email.max,
  },
  {
    field: 'password',
    required: true,
    minLength: userContentLength.password.min,
    maxLength: userContentLength.password.max,
  },
  {
    field: 'confirmPassword',
    required: true,
  },
];

const validateUserCreation = (
  values: any,
  field: string,
  option?: { password?: string }
): any => {
  const ruleField = creationRules.find((element) => element.field === field);

  const baseValidation = validateForm(
    values,
    ruleField as ValidationRule,
    option?.password as string
  );

  return baseValidation;
};

const validateUserEdition = (
  values: string,
  field: string,
  option?: { password?: string }
): any => {
  const ruleField = editionRules.find((element) => element.field === field);

  const baseValidation = validateForm(
    values,
    ruleField as ValidationRule,
    option?.password as string
  );

  return baseValidation;
};

export { validateUserCreation, validateUserEdition };
