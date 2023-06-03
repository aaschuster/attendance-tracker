/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('roles').insert([
    {
      role: "teammember"
    },
    {
      role: "manager"
    },
    {
      role: "owner"
    },
  ]);

  await knex('users').insert([
    {
      firstname: "Billy",
      lastname: "Smith",
      role_id: 1
    },
    {
      firstname: "Erin",
      lastname: "Shuster",
      role_id: 2
    },
    {
      firstname: "Bossman",
      lastname: "Wells",
      role_id: 3
    }
  ])
};
