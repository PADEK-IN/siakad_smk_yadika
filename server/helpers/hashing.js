// //if yout want to use encryption/hashing you can use basic example as below
import * as argon from "argon2";

export const hash = (pw) => {
  return argon.hash(pw);
};

export const compare = (pw, currentPw) => {
  return argon.verify(pw, currentPw);
};

