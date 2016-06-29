
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
        'click #restart': 'clickRestart',
    },
    //////modify these so that energy level and # of moves logs every time a click happens
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
    clickRestart: function() {
        this.model.restart();
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

      let anybuttonclick = this.el.querySelector('#movecount');
        anybuttonclick.textContent = `Move Count: ${this.model.get('userClickCount')}`;

      let energycount = this.el.querySelector('#energy');
      energycount.textContent = `Energy Level: ${this.model.get('userEnergy')}`;
    }
});
