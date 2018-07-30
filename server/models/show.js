const knex = require("../../db/knex");
// const geolib = require('geolib');

// const findResults = (query, locations) => {

//   locations.forEach(location => {
    
//   })
// }

const index = (query, locations) => {
  return knex("shows")
    .join("artists", "shows.artist_id", "artists.id")
    .select("shows.id", "artists.bio", "artists.youtube_id", "artists.instagram_id", "artists.twitter_id", "artists.displayName", "artists.profileImg", "shows.location", "shows.details", "shows.lat", "shows.lng", "shows.start_date_time", "shows.end_time")
    .where("shows.end_time", ">", new Date())
    .then(rows => {
      // console.log(rows);
      return rows;
    })
    .catch(error => {
      console.error(error);
    });
};

// const search = queryStr => {
//   return knex('shows')
//     .then(rows => {
//       return findResults(decodeURI(query), rows);
//     })
//     .catch(error => { console.error(error); }); // the error catching
// }

module.exports = {
  index
  // search
}