let PlayerType = require('./player');

module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/players',

  model: PlayerType,
});
