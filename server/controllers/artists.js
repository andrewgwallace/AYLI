const artistModel = require('../models/artist')

const index = (req, res) => {
  artistModel.index()
    .then(result => { res.json(result); })
    .catch(error => { console.error(error); });
}

module.exports = {
  index
}