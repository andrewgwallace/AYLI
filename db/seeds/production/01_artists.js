
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('artists').del()
    .then(function () {
      // Inserts seed entries
      return knex("artists").insert([
        {
          id: "1",
          twitter_id: "agwallace",
          displayName: "Andrew Wallace",
          email: "andrew.g.wallace@gmail.com",
          profileImg:
            "https://pbs.twimg.com/profile_images/976960658020368384/PJ0N4Pty_normal.jpg",
          instagram_id: "feigningfigure",
          youtube_id: "nanascho3",
          approved: "2" //'2' = approved
        },
        {
          id: "2",
          twitter_id: "wuillymay",
          displayName: "Wuilly Moises Arteaga",
          profileImg:
            "https://pbs.twimg.com/profile_images/963421744458592256/HF85rgaR_normal.jpg",
          email: "wuillymay@email.com",
          instagram_id: "wuillymay",
          youtube_id: "",
          approved: "2"
        },
        {
          id: "3",
          twitter_id: "ayliapp",
          displayName: "AYLIAPP",
          profileImg:
            "https://pbs.twimg.com/profile_images/1019671193282985984/yI3sq-jQ_normal.jpg",
          email: "ayli@ayliapp.com",
          instagram_id: "ayliapp",
          youtube_id: "",
          approved: "2"
        },
        {
          id: "4",
          twitter_id: "@nycsubwayartist",
          displayName: "Enrico Miguel Thomas",
          profileImg:
            "https://pbs.twimg.com/profile_images/527067727295311872/P158gm2q_normal.jpeg",
          email: "emtart@gmail.com",
          instagram_id: "emtart",
          youtube_id: "",
          approved: "2"
        }
      ]);
    });
};