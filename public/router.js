(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let MoveModel = require('./models/movement');
///three views
let MoveView = require('./views/movement');
let UserView = require('./views/users');
let gameOverView = require('./views/gameover');

module.exports= Backbone.Router.extend({
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
                this.gameOver = new gameOverView({
                    model: this.movementmodel,
                    el: document.getElementById('game-over'),
                });
            },
            routes: {
                'default': '',
                'play': 'currentGame',
                'login': 'loginPage',
                'gameover': 'gameOverPage',
            },

            gameOverPage: function() {
                // if (this.movementmodel.get('userEnergy') === 23) {///////
                console.log("i'm in the game over page");
                this.gameOver.el.classList.remove('hidden');
                this.user.el.classList.add('hidden');
                this.move.el.classList.add('hidden');
              // }
            },
            currentGame: function() {
                console.log("i'm in the game play page");
                this.move.el.classList.remove('hidden');
                this.user.el.classList.add('hidden');
                this.gameOver.el.classList.add('hidden');
            },
            loginPage: function() {
                console.log("i'm in the login page");
                this.user.el.classList.remove('hidden');
                this.gameOver.el.classList.add('hidden');
                this.move.el.classList.add('hidden');
            },

        });

},{"./models/movement":2,"./views/gameover":3,"./views/movement":4,"./views/users":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
});

},{}],4:[function(require,module,exports){

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

    },
    //////modify these so that energy level and # of moves logs every time a click happens
    clickUp: function() {
        this.model.up();
    },
    clickDown: function() {
        this.model.down();
    },
    clickLeft: function() {
        this.model.left();
    },
    clickRight: function() {
        this.model.right();
    },
    clickRestart: function() {
        this.model.restart();
    },
    /////render function makes it so that #upxy changes from "-" to whatever number is
    render: function() {
      let upbutton = this.el.querySelector('#yaxis');
        upbutton.textContent = this.model.get('upDownNumber');
        // upbutton.innerHTML = `The song is ${this.model.up()}`;

      let downbutton = this.el.querySelector('#yaxis');
        downbutton.textContent = this.model.get('upDownNumber');
        // downbutton.innerHTML = `The song is ${this.model.down()}`;

      let leftbutton = this.el.querySelector('#xaxis');
        leftbutton.textContent = this.model.get('leftRightNumber');
        // leftbutton.innerHTML = `The song is ${this.model.left()}`;


      let rightbutton = this.el.querySelector('#xaxis');
        rightbutton.textContent = this.model.get('leftRightNumber');
        // rightbutton.innerHTML = `The song is ${this.model.right()}`;

      let anybuttonclick = this.el.querySelector('#movecount');
        anybuttonclick.textContent = `Move Count: ${this.model.get('userClickCount')}`;

      let energycount = this.el.querySelector('#energy');
      energycount.textContent = `Energy Level: ${this.model.get('userEnergy')}`;
    }
});

},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    events: {
        'click #start': 'clickStart',
        'click #smallplayer': 'clickSmall',
        'click #bigplayer': 'clickBig',
        'click #login': 'clickLogin',
        'click #play': 'clickPlay',
    },
    clickStart: function() {
        /////.start is coming from user models start function which get input box value and .....
        let userval = document.getElementById('input').value;
        this.model.start(userval);
    },
    clickLogin: function() {
      console.log('i clicked login');

        /////.start is coming from user models start function which get input box value and .....
    },
    clickPlay: function() {
      console.log('i clicked play');

        /////.start is coming from user models start function which get input box value and .....
    },
    clickSmall: function() {
        let char = document.getElementById('smallplayer');
        this.model.smallcharselect(char);

    },
    clickBig: function() {
            let char = document.getElementById('bigplayer');
            this.model.bigcharselect(char);
        },
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Welcome, ${this.model.get('userName')}`;
    },
});

},{}]},{},[1])