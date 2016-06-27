
let MoveModel = require('./models/movement');
let MoveView = require('./views/movement');
let UserView = require('./views/user');
let UserModel = require('./models/user');

window.addEventListener('load', function () {
    let movementmodel = new MoveModel();

    let move = new MoveView({
        model: movementmodel,
        el: document.getElementById('game-buttons'),
    });

    let usermodel = new UserModel({
    });

    let user = new UserView({
        model: usermodel,
        el: document.getElementById('user-info'),
    });
});
