module.exports = Backbone.Model.extend({
    defaults: {
        upDownNumber: 0,
        // downNumber: 0,
        leftRightNumber: 0,
        // rightNumber: 0
        userName: "gabe"

    },
    up: function() {
      if (this.get('upDownNumber') < 10) {
        this.set('upDownNumber', this.get('upDownNumber') + 1)
      }
    },
    down: function() {
      if (this.get('upDownNumber') > -10) {
        this.set('upDownNumber', this.get('upDownNumber') - 1)
        }
    },
    left: function() {
      if (this.get('leftRightNumber') > -10) {
        this.set('leftRightNumber', this.get('leftRightNumber') - 1)
        }
    },
    right: function() {
      if (this.get('leftRightNumber') < 10) {
        this.set('leftRightNumber', this.get('leftRightNumber') + 1)
        }
    },
    start: function(userval) {
        this.set('userName', userval)
    },
});
