const knex = require("../../db/knex");

const index = () => {
  return (
    knex("shows")
      .join("artists", "shows.artist_id", "artists.id")
      // 'artists.twitter_id', 'artists.instagram_id', 'artists.youtube_id', 'shows.location', 'shows.details', 'shows.lat', 'shows.lng', 'shows.date_time'
      .select("shows.id", "artists.bio", "artists.youtube_id", "artists.instagram_id", "artists.twitter_id", "artists.displayName", "artists.profileImg", "shows.location", "shows.details", "shows.lat", "shows.lng", "shows.date_time")
      .then(rows => {
        // console.log(rows);
        return rows;
      })
      .catch(error => {
        console.error(error);
      })
  );
};

module.exports = {
  index
}