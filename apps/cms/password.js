const sha256 = require('js-sha256');

const hashPassword = (password) => {
  return sha256(password);
};

console.log(hashPassword('Superadmin@12345'));
