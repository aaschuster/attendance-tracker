import bcrypt from "react-native-bcrypt";

const data = [
    {
        firstname: "Billy",
        lastname: "Smith",
        role_id: 1,
        points: 3,
        hiredate: "2023-07-29"
      },
      {
        firstname: "Erin",
        lastname: "Shuster",
        role_id: 2,
        points: 3,
        email: "eshuster@cfa.com",
        password: bcrypt.hashSync("pass", 8),
        hiredate: "2023-07-29"
      },
      {
        firstname: "Bossman",
        lastname: "Wells",
        role_id: 3,
        points: 3,
        email: "bmwelly@ohyeah.com",
        password: bcrypt.hashSync("pass", 8),
        hiredate: "2023-07-29"
      }
];


export default data;