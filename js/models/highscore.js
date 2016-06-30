module.exports = Backbone.Model.extend({
  url:'http://grid.queencityiron.com/api/highscore',

  defaults: {
    userName: '',
    userClickCount: 0,
    characterSize:"big",
  },

});

/////this should live in my playertype.js model file
// module.exports = Backbone.Model.extend({
//   url:'http://grid.queencityiron.com/api/players',
//
//   defaults: {
//     userName: '',
//     characterSize:'',
//   },
//
// });
