
exports.up = function (knex, Promise) {
  return knex.schema.table("artists", t => {
    t.string('tauth_token');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("artists", t => {
    t.dropColumn("tauth_token");
  });
};

