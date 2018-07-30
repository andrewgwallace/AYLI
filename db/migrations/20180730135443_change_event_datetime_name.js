exports.up = function(knex, Promise) {
  return knex.schema.table("shows", t => {
    t.renameColumn("date_time", "start_date_time");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("shows", t => {
    t.renameColumn("start_date_time", "date_time");
  });
};
