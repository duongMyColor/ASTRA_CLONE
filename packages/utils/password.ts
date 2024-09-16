import { sha256 } from 'js-sha256';

export const hashPassword = (password: string) => {
  return sha256(password);
};
const validateLength = (
  value: string,
  minLength: number,
  maxLength: number
) => {
  if (minLength && value?.length < minLength) {
    return {
      message: `${minLength}文字以上である必要があります`,
      args: { min: minLength },
    };
  }
  if (maxLength && value?.length > maxLength) {
    return {
      message: `${maxLength}文字以内である必要があります`,
      args: { max: maxLength },
    };
  }
  return null;
};

export const validatePassword = (password: string, field: string) => {
  if (!password && field !== 'newPassword') return { message: '必須' };

  if (
    password &&
    (password.replace(' ', '').length < 8 ||
      password.replace(' ', '').length > 128)
  )
    return validateLength(password, 8, 128);

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  console.log('regex.test(password)', regex.test(password));

  if (password && regex.test(password) === false) {
    return {
      message:
        'パスワードには少なくとも 1 つの大文字、1 つの小文字、1 つの数字が含まれている必要があります',
    };
  }

  return null;
};
