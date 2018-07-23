const knex = require("../../db/knex");

const index = () => {
  return (
    knex("artists")
      .then(results => {
        // console.log(rows);
        return results;
      })
      .catch(error => {
        console.error(error);
      })
  );
};

module.exports = {
  index
};
