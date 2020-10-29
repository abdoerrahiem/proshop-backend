import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Abdur Rahim',
    email: 'abdoerrahiem@gmail.com',
    password: bcrypt.hashSync('abdoerrahiem', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('johndoe', 10),
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: bcrypt.hashSync('janedoe', 10),
  },
]

export default users
