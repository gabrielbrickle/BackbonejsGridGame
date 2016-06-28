(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let MoveModel = require('./models/movement');
let MoveView = require('./views/movement');
let UserView = require('./views/users');

window.addEventListener('load', function () {
    let movementmodel = new MoveModel();

    let move = new MoveView({
        model: movementmodel,
        el: document.getElementById('game-buttons'),
    });

    let user = new UserView({
        model: movementmodel,
        el: document.getElementById('user-info'),
    });
    //     // let router = new userRouter({
    //     //   Backbone.history.start();
    //     // });
});

},{"./models/movement":2,"./views/movement":3,"./views/users":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){

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
    //////this.model.up ---- up is defined in model so that it count up +1 every time the below click function happens
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


    }
});

},{}],4:[function(require,module,exports){
module.exports = Backbone.View.extend({
    initialize: function() {
        ////on a change of the page, do this
        this.model.on('change', this.render, this);
    },
    events: {
        ///setting up the click event for start button which is #start in html
        'click #start': 'clickStart'
    },
    clickStart: function() {
        /////.start is coming from user models start function which get input box value and .....
        let userval = document.getElementById('input').value;
        this.model.start(userval);
    },
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Welcome, ${this.model.get('userName')}`;
    }
});

},{}]},{},[1])