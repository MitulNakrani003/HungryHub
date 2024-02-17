import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@hungryhub.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ankit Lall",
    email: "ankit@hungryhub.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Shivani Datar",
    email: "shivani@hungryhub.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Ashi Tyagi",
    email: "ashi@hungryhub.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Esha Patel",
    email: "esha@hungryhub.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "testUser",
    email: "testUser@hungryhub.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
