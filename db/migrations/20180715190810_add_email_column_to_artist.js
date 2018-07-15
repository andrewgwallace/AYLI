
exports.up = function(knex, Promise) {
  return knex.schema.table("artists", t => {
    t.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("artists", t => {
    t.dropColumn("email");
  });
};

