import { extractPasswordFromEmail } from "../utils/auth";
import { sendPostData } from "./dataProcessing";

export async function googleLoginUser(email) {
  const response = await sendPostData(`auth/google`, {
    email: email,
    passwordHash: extractPasswordFromEmail(email),
    isGoogle: true,
  }, 'user');
  return response;
}

export async function loginUser(email, passwordHash) {
  const response = await sendPostData(`auth/login`, {
    email: email,
    passwordHash: passwordHash,
    isGoogle: false,
  }, 'user');
  console.log(response);
  return response;
}

export async function registerUser(email) {
  const passwordHash = extractPasswordFromEmail(email);
  const username = passwordHash;
  const response = await sendPostData(`auth/signup`, {
    username,
    email,
    passwordHash,
  }, 'user');
  return response;
}
