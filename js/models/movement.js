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
        if (this.get('leftRightNumber') === 3) {
            console.log('youre at 3 left right');
            this.set('userEnergy', this.get('userEnergy') + 2);
        } else if (this.get('upDownNumber') === 3) {
            this.set('userEnergy', this.get('userEnergy') + 4);
        } else if (this.get('upDownNumber') === -2) {
            this.set('userEnergy', this.get('userEnergy') - 4);
        } else if (this.get('upDownNumber') === 9) {
            this.set('userEnergy', this.get('userEnergy') - 20);
        }
    },
    ///sets the username to what is typed into the input field
    start: function(userval) {
        this.set('userName', userval);

        // console.log('calling start save()');
        // this.set('upDownNumber', 0)
        // this.set('leftRightNumber', 0)
        // this.set('userClickCount', 0)
        // this.set('userEnergy', 10) //////will it work based on charsize

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

    },
    send: function(userName, userClickCount, characterSize) {
        this.set('userName', userName)
        this.set('characterSize', characterSize)
        this.set('userClickCount', userClickCount)
    }

});
