
exports.up = function(knex, Promise) {
  return knex.schema.table("shows", t => {
    t.time("end_time");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("shows", t => {
    t.dropColumn("end_time");
  });
};
