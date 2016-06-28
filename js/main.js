let gameRouter = require('./router');

window.addEventListener('load', function () {
    let router = new gameRouter();
    Backbone.history.start();
});
