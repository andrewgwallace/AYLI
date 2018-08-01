
exports.up = function (knex, Promise) {
  return knex.schema.table("artists", t => {
    t.text('bio');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("artists", t => {
    t.dropColumn("bio");
  });
};
