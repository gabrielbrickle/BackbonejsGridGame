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

        this.movementmodel.on('endgame', function (model) {
            console.log(`${model.get('userEnergy')}`);
            this.navigate(`gameover`, { trigger: true });
        }, this);

        this.movementmodel.on('startover', function (model) {
            console.log('going to the login, bye');
            this.navigate(`login`, { trigger: true });
        }, this);

        this.user.on('play', function (model) {
            this.navigate(`playgame`, { trigger: true });
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
        console.log("i'm in the game over page");
        this.gameOver.el.classList.remove('hidden');
        this.user.el.classList.add('hidden');
        this.move.el.classList.add('hidden');
    },
    currentGame: function() {
        console.log("i'm in the game play page");
        this.move.el.classList.remove('hidden');
        this.user.el.classList.add('hidden');
        this.gameOver.el.classList.add('hidden');
    },
    loginPage: function() {////need to pass in who
        // if (who === null) {
        //     this.navigate('login', {
        //         trigger: true
        //     });
        //     return;
        // }
        // let peperson = this;
        //
        // let gameUser = new UserModel();
        // internetPerson.fetch({
        //     url: `http://localhost:8000/api/players/${who}`,////WILL CHANGE
        //     success: function () {
        //         person.loginPage.model = internetPerson;
        //         person.loginPage.render();
        //     },
        // });

        // console.log('show user route for ' + who);
        console.log("i'm in the login page");
        this.user.el.classList.remove('hidden');
        this.gameOver.el.classList.add('hidden');
        this.move.el.classList.add('hidden');
    },

});
