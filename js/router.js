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
