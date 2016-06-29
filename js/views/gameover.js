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
