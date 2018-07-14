
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('artists').del()
    .then(function () {
      // Inserts seed entries
      return knex('artists').insert([
        {
          id: "1",
          twitter_id: "agwallace",
          instagram_id: "feigningfigure",
          youtube_id: '',
          approved: "1"
        },
        {
          id: "2",
          twitter_id: "wuillymay",
          instagram_id: "wuillymay",
          youtube_id: '',
          approved: "1"
        }
      ]);
    });
};