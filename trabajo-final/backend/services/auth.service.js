import { generateToken } from "../utils/token.js";
import { cleanUser, createUser, findUserByEmail, findUserById } from "./user.service.js";

const sessions = [];

export async function register(data) {
  const existing = findUserByEmail(data.email);

  if (existing) {
    throw new Error("El email ya esta registrado");
  }

  const user = await createUser(data);
  const token = generateToken();
  sessions.push({ token, userId: user.id });

  return {
    token,
    user: cleanUser(user)
  };
}

export async function login({ email, password }) {
  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    throw new Error("Credenciales invalidas");
  }

  const token = generateToken();
  sessions.push({ token, userId: user.id });

  return {
    token,
    user: cleanUser(user)
  };
}

export function findUserByToken(token) {
  const session = sessions.find(currentSession => currentSession.token === token);

  if (!session) return null;

  const user = findUserById(session.userId);

  return user ? cleanUser(user) : null;
}
