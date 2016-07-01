(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            console.log(`${model.get('startingEnergy')}`);
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

},{"./models/movement":4,"./views/gameover":7,"./views/movement":8,"./views/users":9}],2:[function(require,module,exports){
let HighScore = require('./highscore');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/highscore',
    model: HighScore,
});

},{"./highscore":3}],3:[function(require,module,exports){
module.exports = Backbone.Model.extend({
  url:'http://grid.queencityiron.com/api/highscore',

  defaults: {
    playerType: '',
    score: 0,
    name: "big",
  },

});

},{}],4:[function(require,module,exports){
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

},{"./highscore":3,"./highscore.collection":2,"./player":6,"./player.collection":5}],5:[function(require,module,exports){
let PlayerType = require('./player');

module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/players',

  model: PlayerType,
});

},{"./player":6}],6:[function(require,module,exports){
module.exports = Backbone.Model.extend({

  url:'http://grid.queencityiron.com/api/players',

  defaults: {
    name:'',
    energyPerMove: 0,
    startingEnergy: 0,
  },

});

},{}],7:[function(require,module,exports){
module.exports = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.render, this);
        // this.model.bestscore.on('scoreload', this.render, this);
    },
    events: {
        'click #restart': 'clickRestart',
    },
    clickRestart: function() {
        console.log('restart');
        this.model.restart();
    },
    sendScores: function() { ///sends the score to the server
        // let bestscore = new HighScoreCollection;
        // let that = this;
            this.set('userName', this.get('userName'));
            this.set('score', this.get('score'));
            this.set('name', this.get('name'));

        this.save();
    },
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Ya Lost, ${this.model.get('userName')}`;

        let finalScore = this.el.querySelector('#scoreboard');
        finalScore.textContent = `Your Final Score is : ${this.model.get('score')}`;

        let renderScores = this.el.querySelector('#highscorelist');//////////////////////////////
        this.model.bestscore.forEach(function(element){
          let listofscores = document.createElement('li');
          renderScores.appendChild(listofscores);
          listofscores.innerHTML =`<p>${element.get('name')}</p><p>${element.get('score')}</p><p>${element.get('playerType')}</p>`;

        });

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
        this.model.up();
        // this.model.sendScores();
    },
    clickDown: function() {
        this.model.down();
        // this.model.sendScores();

    },
    clickLeft: function() {
        this.model.left();
        // this.model.sendScores();

    },
    clickRight: function() {
        this.model.right();
        // this.model.sendScores();
    },
    clickRestart: function() {
        this.model.restart();
    },

    gridGenerator: function(){
      let gridGameGrid = document.getElementById('grid');
      gridGameGrid.innerHTML = '';
      let size = 10;
      for (var y = 0; y < size; y++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (var x = 0; x < size; x++ ) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
        if (this.model.get('yNumber') === y && this.model.get('xNumber') === x){ //////From Logan 
          cell.setAttribute('id', 'player');
        }
      }
      gridGameGrid.appendChild(row);
    }
    // document.getElementById('grid')
  },
    /////render function makes it so that #upxy changes from "-" to whatever number is
    render: function() {
      console.log('rendering');
      let upbutton = this.el.querySelector('#yaxis');
        upbutton.textContent = this.model.get('yNumber');

      let downbutton = this.el.querySelector('#yaxis');
        downbutton.textContent = this.model.get('yNumber');

      let leftbutton = this.el.querySelector('#xaxis');
        leftbutton.textContent = this.model.get('xNumber');

      let rightbutton = this.el.querySelector('#xaxis');
        rightbutton.textContent = this.model.get('xNumber');

      let anybuttonclick = this.el.querySelector('#movecount');
        anybuttonclick.textContent = `Move Count: ${this.model.get('score')}`;

      let energycount = this.el.querySelector('#energy');
      energycount.textContent = `Energy Level: ${this.model.get('startingEnergy')}`;

      this.gridGenerator();
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
        'click .playersize': 'clickCharButton',
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
    clickCharButton: function(event) {
        let char = event.target.textContent;
        console.log(event.target.textContent);
        this.model.setPlayerType(char);

        this.trigger('created', this.model);
    },

    render: function(){
      let renderButtons = this.el.querySelector('#buttonrender');
      renderButtons.innerHTML = '';
      this.model.playertype.forEach(function(element){
        let newbutton = document.createElement('button');
        newbutton.id = element.get('name');
        newbutton.classList.add('playersize');
        renderButtons.appendChild(newbutton);
        newbutton.textContent = element.get('name');
      })
      console.log(this.model.playertype);
    }

});

},{}]},{},[1])