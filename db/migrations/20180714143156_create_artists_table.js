
exports.up = function (knex, Promise) {
  return knex.schema.createTable('artists', t => {
    t.increments();
    t.integer('approved');
    t.integer('licensed');
    t.string('twitter_id');
    t.string('instagram_id');
    t.string('youtube_id');
    t.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('artists')
};