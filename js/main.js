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
