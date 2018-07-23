
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('artists').del()
    .then(function () {
      // Inserts seed entries
      return knex('artists').insert([
        {
          id: "1",
          twitter_id: "agwallace",
          displayName: "Andrew Wallace",
          email: "andrew.g.wallace@gmail.com",
          instagram_id: "feigningfigure",
          youtube_id: '',
          approved: "2" //'2' = approved
        },
        {
          id: "2",
          twitter_id: "wuillymay",
          displayName: "Wuilly Moises Arteaga",
          email: "wuillymay@email.com",
          instagram_id: "wuillymay",
          youtube_id: '',
          approved: "2"
        },
        {
          id: "3",
          twitter_id: "ayliapp",
          displayName: "AYLIAPP",
          profileImg: "https://pbs.twimg.com/profile_images/1019671193282985984/yI3sq-jQ_normal.jpg", 
          email: "wuillymay@email.com",
          instagram_id: "wuillymay",
          youtube_id: '',
          approved: "2"
        }
      ]);
    });
};