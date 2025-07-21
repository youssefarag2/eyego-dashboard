export interface User {
  id: string;
  name: string;
  email: string;
}

const mockUser: User = {
  id: "1",
  name: "Admin User",
  email: "admin@eyego.com",
};

// This function simulates an API call to a login endpoint.
export const mockLogin = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === mockUser.email && password === "password") {
        resolve(mockUser);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};
