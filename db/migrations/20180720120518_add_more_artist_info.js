exports.up = function(knex, Promise) {
  return knex.schema.table("artists", t => {
    t.string("profileImg");
    t.string("displayName");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("artists", t => {
    t.dropColumn("profileImg");
    t.dropColumn("displayName");
  });
};
