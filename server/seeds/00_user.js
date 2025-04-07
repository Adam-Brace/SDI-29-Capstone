exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert([
    { first_name: "John", last_name: "Jacob", rank: "Sgt", email: "john.jacob1@example.com", phone: "999-999-9999", organization: "Delta 1", crew: "Bravo", position: "SVO", permissions: "user" },
    { first_name: "Patrick", last_name: "Johnson", rank: "Cpt", email: "patric.johnson@example.com", phone: "999-999-9999", organization: "Delta 1", crew: "Front Office", position: "CSS", permissions: "admin" },
    { first_name: "Frank", last_name: "Smith", rank: "SMSgt", email: "frank.smith@example.com", phone: "999-999-9999", organization: "Delta 1", crew: "Alpha", position: "CCH", permissions: "user" },
    { first_name: "Sarah", last_name: "Young", rank: "TSgt", email: "sarah.young@example.com", phone: "999-999-9999", organization: "Delta 1", crew: "Charlie", position: "SSO", permissions: "user" }
  ]);
};
