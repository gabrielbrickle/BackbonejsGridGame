let HighScore = require('./highscore');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/highscore',
    model: HighScore,
});

/////this will live in my playertype.collection.js model file

// let PlayerType = require('./playertype');
//
// module.exports = Backbone.Collection.extend({
//   url:'http://grid.queencityiron.com/api/players',
//   model: PlayerType,
// });
