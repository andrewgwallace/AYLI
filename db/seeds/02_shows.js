
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('shows').del()
    .then(function () {
      // Inserts seed entries
      return knex("shows").insert([
        {
          id: "1",
          date_time: "2018-07-13 11:34",
          lat: "40.755977",
          lng: "-73.986988",
          location: "42nd St and 7th Ave.",
          details: "I'll be playing by the Union Street mural right before you exit onto 42nd",
          artist_id: "1"
        },
        {
          id: "2",
          date_time: "2018-07-14 14:00",
          lat: "40.757230",
          lng: "-73.989799",
          location: "Times Square, NYC",
          details: "I'm right in the center of Times Square near the walking path.",
          artist_id: "2"
        }
      ]);
    });
};