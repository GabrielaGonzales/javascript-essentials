let users = [
  {
    id: 1,
    fullName: "Usuario Demo",
    password: "demo123",
    email: "demo@libros.com",
    age: 30,
    address: "Av. Principal 123",
    phone: "70000000"
  }
];

export async function createUser(data) {
  const user = {
    id: Date.now(),
    ...data,
    age: Number(data.age)
  };

  users.push(user);
  return user;
}

export function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

export function findUserById(id) {
  return users.find(user => user.id === Number(id));
}

export function cleanUser(user) {
  const { password, ...userClean } = user;
  return userClean;
}
