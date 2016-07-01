module.exports = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.render, this);
        // this.model.bestscore.on('scoreload', this.render, this);
    },
    events: {
        'click #restart': 'clickRestart',
    },
    clickRestart: function() {
        console.log('restart');
        this.model.restart();
    },
    sendScores: function() { ///sends the score to the server
        // let bestscore = new HighScoreCollection;
        // let that = this;
            this.set('userName', this.get('userName'));
            this.set('score', this.get('score'));
            this.set('name', this.get('name'));

        this.save();
    },
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Ya Lost, ${this.model.get('userName')}`;

        let finalScore = this.el.querySelector('#scoreboard');
        finalScore.textContent = `Your Final Score is : ${this.model.get('score')}`;

        let renderScores = this.el.querySelector('#highscorelist');//////////////////////////////
        this.model.bestscore.forEach(function(element){
          let listofscores = document.createElement('li');
          renderScores.appendChild(listofscores);
          listofscores.innerHTML =`<p>${element.get('name')}</p><p>${element.get('score')}</p><p>${element.get('playerType')}</p>`;

        });

        // let highscores= new HighScoreCollection();
        // highscores.fetch({
        //   success: function(){
        //     console.log(highscores)
        ////////also need to add something like highscores.getScore.render();
        //   }
        // });
    },
});
