module.exports = Backbone.Model.extend({
  url:'http://grid.queencityiron.com/api/highscore',

  defaults: {
    userName: '',
    userClickCount: 0,
    characterSize: "big",
  },

});
