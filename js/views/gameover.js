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

        // let highscores= new HighScoreCollection();
        // highscores.fetch({
        //   success: function(){
        //     console.log(highscores)
        ////////also need to add something like highscores.getScore.render();
        //   }
        // });
    },
});
