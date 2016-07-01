let HighScore = require('./highscore');
let PlayerType = require('./player');
let PlayerTypeCollection = require('./player.collection');
let HighScoreCollection = require('./highscore.collection');

module.exports = Backbone.Model.extend({
    initialize: function() {
        this.playertype = new PlayerTypeCollection();
        let that = this;
        this.bestscore = new HighScoreCollection();
        this.bestscore.fetch({
          success: function(){
            console.log(that.bestscore);
            // bestscore.trigger('scoreload')
          }
        })
    },
    defaults: {
        yNumber: 0,
        xNumber: 0,
        userName: "gabe",
        startingEnergy: 0,
        score: 0,
        energyPerMove: 0,
        name: "na",
    },
    up: function() {
        console.log(this.get('name'));
        if (this.get('yNumber') < 10) {
            this.set('yNumber', this.get('yNumber') + 1)
            this.set('score', this.get('score') + 1)
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        }

        if (this.get('startingEnergy') <= 0) {
            console.log('out of energy');
            this.trigger('endgame', this);
        }
    },

    down: function() {
        if (this.get('yNumber') > -10) {
            this.set('yNumber', this.get('yNumber') - 1)
            this.set('score', this.get('score') + 1)
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        }
        if (this.get('startingEnergy') <= 0) {
            console.log('out of energy');
            this.trigger('endgame', this);
        }
    },
    right: function() {
        console.log(this.get('name'));
        if (this.get('xNumber') < 10) {
            this.set('xNumber', this.get('xNumber') + 1)
            this.set('score', this.get('score') + 1)
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        }

        if (this.get('startingEnergy') <= 0) {
            console.log('out of energy');
            this.trigger('endgame', this);
            this.model.sendScores();

        }
    },
    left: function() {
        if (this.get('xNumber') > -10) {
            this.set('xNumber', this.get('xNumber') - 1)
            this.set('score', this.get('score') + 1)
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        }
        if (this.get('startingEnergy') <= 0) {
            console.log('out of energy');
            this.trigger('endgame', this);
            this.model.sendScores();

        }
    },

    // scoreIncrease: function() {
    //     if (this.get('xNumber') === 1) {
    //         console.log('youre at 3 left right');
    //         this.set('startingEnergy', this.get('startingEnergy') + 2);
    //     } else if (this.get('yNumber') === 1) {
    //         this.set('startingEnergy', this.get('startingEnergy') + 4);
    //     } else if (this.get('yNumber') === -2) {
    //         this.set('startingEnergy', this.get('startingEnergy') - 4);
    //     } else if (this.get('yNumber') === 9) {
    //         this.set('startingEnergy', this.get('startingEnergy') - 2);
    //     }
    // },

    start: function(userval) {
        this.set('userName', userval);
    },

    restart: function() {
        this.trigger('startover');
        this.clear({
            silent: true
        });
        this.set(this.defaults);
    },

    setPlayerType: function(type) {
      /////FROM RIGGAN
        let target = this.playertype.find(function(playertype) {
            return playertype.get('name') === type;
        });
        this.set('name', type);
        this.set('startingEnergy', target.get('startingEnergy'));
        this.set('energyPerMove', target.get('energyPerMove'));
        console.log('set the player type');
    },

    // sendScores: function() { ///sends the score to the server
    //     // let bestscore = new HighScoreCollection;
    //     // let that = this;
    //         this.set('userName', this.get('userName'));
    //         this.set('score', this.get('score'));
    //         this.set('name', this.get('name'));
    //
    //     this.save();
    // },

    getUser: function() {
        let that = this;
        this.playertype.fetch({
            success: function() {
                that.playertype.trigger('gotTypes')

            }
        });
    },

});
