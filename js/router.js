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
