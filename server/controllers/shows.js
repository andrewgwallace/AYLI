const showModel = require('../models/show')

const index = (req, res) => {
  showModel.index()
    .then( result => { res.json(result);})
    .catch(error => { console.error(error); });
}

module.exports = {
  index
}