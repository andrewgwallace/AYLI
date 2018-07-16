const knex = require("../../db/knex");

const index = () => {
  return knex('shows')
    .then(rows => rows)
    .catch(error => {console.error(error);});
};

module.exports = {
  index
}