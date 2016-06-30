module.exports = Backbone.Model.extend({
    url: 'http://tiny-tiny.herokuapp.com/collections/gridgame',

    defaults: {
        upDownNumber: 0,
        leftRightNumber: 0,
        userName: "gabe",
        userEnergy: 10,
        userClickCount: 0,
        characterSize: "na",
    },
    up: function() {
        if (this.get('upDownNumber') < 10 && this.get('characterSize') === 'Big') {
            this.set('upDownNumber', this.get('upDownNumber') + 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)

            console.log(this.get('userClickCount'));
        } else if (this.get('characterSize') === 'Small' && this.get('upDownNumber') < 10) {
            this.set('upDownNumber', this.get('upDownNumber') + 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 1)
        }
        if (this.get('userEnergy') <= 0) {
            console.log('out of energy');
            this.trigger('endgame', this);
            this.save();
        }
    },
    down: function() {
        if (this.get('upDownNumber') > -10 && this.get('characterSize') === 'Big') {
            this.set('upDownNumber', this.get('upDownNumber') - 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)

            console.log(this.get('userClickCount'));
        } else if (this.get('characterSize') === 'Small' && this.get('upDownNumber') > -10) {
            this.set('upDownNumber', this.get('upDownNumber') - 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 1)
        }
        if (this.get('userEnergy') <= 0) {
            console.log('out of energy');
            this.trigger('endgame', this);
            this.save();

        }
    },

    left: function() {
        if (this.get('leftRightNumber') > -10 && this.get('characterSize') === 'Big') {
            this.set('leftRightNumber', this.get('leftRightNumber') - 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        } else if (this.get('characterSize') === 'Small' && this.get('leftRightNumber') > -10) {
            this.set('leftRightNumber', this.get('leftRightNumber') - 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 1)
        }
        if (this.get('userEnergy') <= 0) {
            console.log('out of energy');
            this.trigger('endgame', this);
            this.save();

        }
    },
    right: function() {
        if (this.get('leftRightNumber') < 10 && this.get('characterSize') === 'Big') {
            this.set('leftRightNumber', this.get('leftRightNumber') + 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        } else if (this.get('characterSize') === 'Small' && this.get('leftRightNumber') < 10) {
            this.set('leftRightNumber', this.get('leftRightNumber') + 1)
            this.set('userClickCount', this.get('userClickCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 1)
        }
        if (this.get('userEnergy') <= 0) {
            this.trigger('endgame', this);
            this.save();

        }
    },

    scoreIncrease: function() {
        if (this.get('leftRightNumber') === 1) {
            console.log('youre at 3 left right');
            this.set('userEnergy', this.get('userEnergy') + 2);
        } else if (this.get('upDownNumber') === 1) {
            this.set('userEnergy', this.get('userEnergy') + 4);
        } else if (this.get('upDownNumber') === -2) {
            this.set('userEnergy', this.get('userEnergy') - 4);
        } else if (this.get('upDownNumber') === 9) {
            this.set('userEnergy', this.get('userEnergy') - 2);
        }
    },
    /////need to figure out how to zero out everything and still use above functions
    start: function(userval) {
        this.set('userName', userval);
    },
    bigcharselect: function(char) {
        this.set('characterSize', char)
        this.set('userEnergy', 15)
        console.log(this.get('characterSize'));
        console.log('calling big save()');

    },
    smallcharselect: function(char) {
        this.set('characterSize', char)
        console.log(this.get('characterSize'));
        console.log('calling small save()');

    },
    restart: function() {

        this.trigger('startover');
        this.clear({
            silent: true
        });
        this.set(this.defaults);

    },

});
