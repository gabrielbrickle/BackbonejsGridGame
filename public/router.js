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
        // if (who === null) {
        //       this.navigate('login', { trigger: true });
        //       return;
        //   }
        // let person = this;
        // let gameUser = new MoveModel();
        // gameUser.fetch({
        //     url: `http://tiny-tiny.herokuapp.com/collections/gridgame`,////WILL CHANGE
        //     success: function () {
        //         person.loginPage.model = gameUser;
        //         person.loginPage.render();
        //     },
        // });

        console.log('show user route for ' + who);
        this.user.el.classList.remove('hidden');
        this.gameOver.el.classList.add('hidden');
        this.move.el.classList.add('hidden');
    },

});

},{"./models/movement":2,"./views/gameover":3,"./views/movement":4,"./views/users":5}],2:[function(require,module,exports){
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
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Ya Lost, ${this.model.get('userName')}`;

        let finalScore = this.el.querySelector('#scoreboard');
        finalScore.textContent = `Your Final Score is : ${this.model.get('userClickCount')}`;

        // let topPlayers = this.el.querySelector('#topplayers');
        // topPlayers.textContent= `High Scores`
        ///will be userName + userClickCount of top 5 users
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
        'click #restart': 'clickRestart',
    },
    //////modify these so that energy level and # of moves logs every time a click happens
    clickUp: function() {
        this.model.up();
        this.model.scoreIncrease();
    },
    clickDown: function() {
        this.model.down();
        this.model.scoreIncrease();

    },
    clickLeft: function() {
        this.model.left();
        this.model.scoreIncrease();

    },
    clickRight: function() {
        this.model.right();
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

},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },
    events: {
        'click #start': 'clickStart',
        'click #login': 'clickLogin',
        'click #play': 'clickPlay',
        'click #smallplayer': 'clickSmall',
        'click #bigplayer': 'clickBig',
    },
    clickStart: function() {

        let userval = document.getElementById('input').value;
        console.log('clicked start', userval);
        this.model.start(userval);
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
        let char = document.getElementById('bigplayer').value;
        this.model.bigcharselect(char);
        this.trigger('created', this.model); /////NEW

    },
    clickSmall: function() {
        let char = document.getElementById('smallplayer').value;
        this.model.smallcharselect(char);
        this.trigger('created', this.model); //////NEW

    },

});

},{}]},{},[1])