let HighScore = require('./highscore');
let PlayerType = require('./player');
let PlayerTypeCollection = require('./player.collection');

module.exports = Backbone.Model.extend({
  initialize: function(){
    this.playertype = new PlayerTypeCollection();
  },
    defaults: {
        upDownNumber: 0,
        leftRightNumber: 0,
        userName: "gabe",
        userEnergy: 10,
        userClickCount: 0,
        characterSize: "na",
    },
    upright: function() {
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
            // this.save();
        }
    },

    leftdown: function() {
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
            // this.save();

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

    start: function(userval) {
        this.set('userName', userval);
    },
    bigcharselect: function(char) {
        this.set('characterSize', name)
        this.set('startingEnergy', this.get('startingEnergy'))
        console.log(this.get('characterSize'));
        console.log(this.playertype.startingEnergy);

        // if (this.get('name') === 'small') {
        //   this.playertype.set()
        // }

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

    setPlayerType: function(){
      this.set('name', document.getElementById('name').value);
      this.set('characterSize', event.target.textContent);
      console.log('set the player type');
    },

    // sendScores: function() { ///sends the score to the server
    //     let bestscore = new HighScoreCollection({
    //         bestscore.set('userName', this.get('userName'));
    //         bestscore.set('userClickCount', this.get('userClickCount'));
    //         bestscore.set('characterSize', this.get('characterSize'));
    //     });
    //     console.log(`This is the highscore ${highscore.get.('userName')} ${highscore.get.('userClickCount')}`);
    //     bestscore.save();
    // },
    ////get the scores from the serve
    // getScores: function() {
    //     let grabscore = new HighScore({
    //         grabscore.fetch({
    //             success: function() {
    //                 console.log('got the scores');
    //             }
    //         })
    //     })
    // },

    getUser: function() {
        let that = this;
        // this.playertype = new PlayerTypeCollection();
        this.playertype.fetch({
            success: function() {
                // console.log(playertype)
                that.playertype.trigger('gotTypes')

                //////also need to add something like self.showUser.render();
            }
        });
    },

});
