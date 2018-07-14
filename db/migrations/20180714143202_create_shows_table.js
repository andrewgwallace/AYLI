
exports.up = function (knex, Promise) {
  return knex.schema.createTable('shows', t => {
    t.increments();
    t.datetime('date_time');
    t.decimal('lat', 9, 6)
    t.decimal('lng', 9, 6);
    t.text('details');
    t.string('location');
    t.integer("artist_id")
      .references("id")
      .inTable("artists")
      .index()
      .onDelete("cascade");;
    t.timestamps(true, true);
  }
  )
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('shows');
};
