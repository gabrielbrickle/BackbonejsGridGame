module.exports = Backbone.Model.extend({
  url:'http://grid.queencityiron.com/api/highscore',

  defaults: {
    playerType: '',
    score: 0,
    name: "big",
  },

});
