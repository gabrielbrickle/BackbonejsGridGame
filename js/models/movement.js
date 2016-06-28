module.exports = Backbone.Model.extend({
    defaults: {
        upDownNumber: 0,
        leftRightNumber: 0,
        userName: "gabe",
        userEnergy: 100,
        userClickCount: 0,
        characterSize: "na",
    },
    up: function() {
        if (this.get('upDownNumber') < 10) {
            this.set('upDownNumber', this.get('upDownNumber') + 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 8)

            console.log(this.get('userClickCount'));
        }
    },
    down: function() {
        if (this.get('upDownNumber') > -10) {
            this.set('upDownNumber', this.get('upDownNumber') - 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 4)

            console.log(this.get('userClickCount'));
        }
    },

    left: function() {
        if (this.get('leftRightNumber') > -10) {
            this.set('leftRightNumber', this.get('leftRightNumber') - 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 11)

        }
    },
    right: function() {
        if (this.get('leftRightNumber') < 10) {
            this.set('leftRightNumber', this.get('leftRightNumber') + 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 20)

        }
    },
    start: function(userval) {
        this.set('userName', userval)
    },
    bigcharselect: function() {
      
        this.set('characterSize', this.get('characterSize'))
        console.log(this.get('characterSize'));//////null right now
    },
    smallcharselect: function() {
        this.set('characterSize', this.get('characterSize'))
        console.log(this.get('characterSize'));//////null right now
    },
    restart: function() {
      console.log('restart');
      // this.set('upDownNumber', this.get('upDownNumber') === 0)
      // this.set('leftRightNumber', this.get('leftRightNumber') === 0)
      // this.set('userClickCount', this.get('userClickCount') === 0)
      // this.set('userEnergy', this.get('userEnergy') === 0)

    },

});
