(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let gameRouter = require('./router');

window.addEventListener('load', function () {
    let router = new gameRouter();
    Backbone.history.start();
});

},{"./router":6}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({
  url:'http://grid.queencityiron.com/api/highscore',

  defaults: {
    userName: '',
    userClickCount: 0,
    characterSize: "big",
  },

});

},{}],3:[function(require,module,exports){
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

},{"./highscore":2,"./player":5,"./player.collection":4}],4:[function(require,module,exports){
let PlayerType = require('./player');

module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/players',

  model: PlayerType,
});

},{"./player":5}],5:[function(require,module,exports){
module.exports = Backbone.Model.extend({

  url:'http://grid.queencityiron.com/api/players',

  defaults: {
    name:'',
    energyPerMove: 0,
    startingEnergy: 0,
  },

});

},{}],6:[function(require,module,exports){
let MoveModel = require('./models/movement');
let MoveView = require('./views/movement');
let UserView = require('./views/users');
let gameOverView = require('./views/gameover');

module.exports = Backbone.Router.extend({
    initialize: function() {
        this.movementmodel = new MoveModel();


        this.move = new MoveView({
            model: this.movementmodel,
            el: document.getElementById('game-view'),
        });

        this.user = new UserView({
            model: this.movementmodel,
            el: document.getElementById('user-info'),
        });

        this.movementmodel.on('endgame', function(model) {
            console.log(`${model.get('userEnergy')}`);
            this.navigate(`gameover`, {
                trigger: true
            });
        }, this);

        this.movementmodel.on('startover', function(model) {
            this.navigate(`login`, {
                trigger: true
            });
        }, this);

        this.user.on('play', function(model) {
            this.navigate(`playgame`, {
                trigger: true
            });
        }, this);

        this.gameOver = new gameOverView({
            model: this.movementmodel,
            el: document.getElementById('game-over'),
        });
    },
    routes: {
        'default': '',
        'playgame': 'currentGame',
        'login': 'loginPage',
        'gameover': 'gameOverPage',
    },

    gameOverPage: function() {
      // let grabscore = new HighScoreCollection({
      //        grabscore.fetch({
      //            success: function() {
      //                console.log('got the scores');
      //            }
      //        })
      //    })

        this.gameOver.el.classList.remove('hidden');
        this.user.el.classList.add('hidden');
        this.move.el.classList.add('hidden');

    },
    currentGame: function() {
        this.move.el.classList.remove('hidden');
        this.user.el.classList.add('hidden');
        this.gameOver.el.classList.add('hidden');
    },
    loginPage: function(who) {
        this.movementmodel.getUser();
        
        this.user.el.classList.remove('hidden');
        this.gameOver.el.classList.add('hidden');
        this.move.el.classList.add('hidden');
    },

});

},{"./models/movement":3,"./views/gameover":7,"./views/movement":8,"./views/users":9}],7:[function(require,module,exports){
module.exports = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    events: {
        'click #restart': 'clickRestart',
    },
    clickRestart: function() {
        console.log('restart');
        this.model.restart();
    },
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Ya Lost, ${this.model.get('userName')}`;

        let finalScore = this.el.querySelector('#scoreboard');
        finalScore.textContent = `Your Final Score is : ${this.model.get('userClickCount')}`;

        // let highscores= new HighScoreCollection();
        // highscores.fetch({
        //   success: function(){
        //     console.log(highscores)
        ////////also need to add something like highscores.getScore.render();
        //   }
        // });
    },
});

},{}],8:[function(require,module,exports){

module.exports = Backbone.View.extend({
    initialize: function() {
      this.model.on('change', this.render, this);
    },
    /////click events object for the functions listed below
    events: {
        'click #up': 'clickUp',
        'click #down': 'clickDown',
        'click #left': 'clickLeft',
        'click #right': 'clickRight',
        'click #restart': 'clickRestart',
    },
    //////modify these so that energy level and # of moves logs every time a click happens
    clickUp: function() {
        this.model.upright();
        this.model.scoreIncrease();
    },
    clickDown: function() {
        this.model.leftdown();
        this.model.scoreIncrease();

    },
    clickLeft: function() {
        this.model.leftdown();
        this.model.scoreIncrease();

    },
    clickRight: function() {
        this.model.upright();
        this.model.scoreIncrease();
    },
    clickRestart: function() {
        this.model.restart();
    },
    /////render function makes it so that #upxy changes from "-" to whatever number is
    render: function() {
      let upbutton = this.el.querySelector('#yaxis');
        upbutton.textContent = this.model.get('upDownNumber');

      let downbutton = this.el.querySelector('#yaxis');
        downbutton.textContent = this.model.get('upDownNumber');

      let leftbutton = this.el.querySelector('#xaxis');
        leftbutton.textContent = this.model.get('leftRightNumber');

      let rightbutton = this.el.querySelector('#xaxis');
        rightbutton.textContent = this.model.get('leftRightNumber');

      let anybuttonclick = this.el.querySelector('#movecount');
        anybuttonclick.textContent = `Move Count: ${this.model.get('userClickCount')}`;

      let energycount = this.el.querySelector('#energy');
      energycount.textContent = `Energy Level: ${this.model.get('userEnergy')}`;
    }
});

},{}],9:[function(require,module,exports){
module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.playertype.on('gotTypes', this.render, this);
        this.model.getUser();
    },
    events: {
        'click #start': 'clickStart',
        'click #login': 'clickLogin',
        'click #play': 'clickPlay',
        'click #Small': 'clickSmall',
        'click #Large': 'clickBig',
        // 'click #Gargantuan': 'clickBig',
        'click button': 'clickChar'
    },
    clickStart: function() {

        let userval = document.getElementById('input').value;
        console.log('clicked start', userval);
        this.model.start(userval);
        console.log(event.target.textContent);
        // 'An event just happened'.
        this.trigger('play', this);

    },
    clickLogin: function() {
        console.log('i clicked login');
    },
    clickPlay: function() {
        console.log('i clicked play');
    },
    clickBig: function() {
        let char = document.getElementById('Large').value;
        console.log(event.target.textContent);
        this.model.bigcharselect(char);
        this.trigger('created', this.model);

    },
    clickSmall: function() {
        let char = document.getElementById('Small').value;
        this.model.smallcharselect(char);
        this.trigger('created', this.model);

    },
    render: function(){
      let renderButtons = this.el.querySelector('#buttonrender');
      renderButtons.innerHTML = '';
      this.model.playertype.forEach(function(element){
        let newbutton = document.createElement('button');
        newbutton.id = element.get('name');
        renderButtons.appendChild(newbutton);
        newbutton.textContent = element.get('name');
      })
      console.log(this.model.playertype);
    }

});

},{}]},{},[1])